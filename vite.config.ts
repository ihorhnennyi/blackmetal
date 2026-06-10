import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

function resolveBuildId(): string {
	if (process.env.VITE_BUILD_ID) return process.env.VITE_BUILD_ID
	try {
		return execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim()
	} catch {
		return String(Date.now())
	}
}

/** У продакшні новини з окремого JSON (fetch + no-store). Назва без «feed» — інакше AdBlock/uBlock на десктопі часто блокує URL. */
function emitNewsDataPlugin(buildId: string): Plugin {
	return {
		name: 'emit-news-data',
		generateBundle() {
			this.emitFile({
				type: 'asset',
				fileName: 'version.json',
				source: JSON.stringify({ buildId, builtAt: new Date().toISOString() }),
			})

			const newsData = JSON.parse(
				fs.readFileSync(path.resolve(process.cwd(), 'src/data/newsData.json'), 'utf-8')
			)
			for (const lang of ['ua', 'en'] as const) {
				const translationData = JSON.parse(
					fs.readFileSync(
						path.resolve(process.cwd(), `src/i18n/locales/${lang}/news.json`),
						'utf-8'
					)
				)
				const mergedNews = newsData.news.map((commonItem: { id: number }) => {
					const translationItem = translationData.news.find(
						(item: { id: number }) => item.id === commonItem.id
					)
					return {
						...commonItem,
						title: translationItem?.title ?? '',
						text: translationItem?.text ?? '',
						content: translationItem?.content,
					}
				})
				const payload = {
					newsTitle: translationData.newsTitle,
					news: mergedNews,
				}
				this.emitFile({
					type: 'asset',
					fileName: `news-data.${lang}.json`,
					source: JSON.stringify(payload),
				})
			}
		},
	}
}

const buildId = resolveBuildId()

export default defineConfig({
  define: {
    'import.meta.env.VITE_BUILD_ID': JSON.stringify(buildId),
  },
  build: {
    // Одна збірка без dual legacy/modern: стабільніше в Chrome, Safari, Edge (без SystemJS і inline-детектора)
    target: ['es2020', 'chrome87', 'firefox78', 'safari14', 'edge88', 'ios14'],
    cssTarget: ['chrome87', 'safari14'],
  },
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@config': '/src/config',
      '@hooks': '/src/hooks',
      '@layouts': '/src/layouts',
      '@pages': '/src/pages',
      '@router': '/src/router',
      '@store': '/src/store',
      '@styles': '/src/styles',
      '@types': '/src/types',
      '@utils': '/src/utils'
    },
    dedupe: ['react', 'react-dom']
  },
  base: '/',
  plugins: [
    react(),
    emitNewsDataPlugin(buildId),
    {
      name: 'inject-build-id',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `\t\t<meta name="app-build-id" content="${buildId}" />\n\t</head>`
        )
      },
    },
  ],
  server: {
    fs: {
      allow: ['.', '..']
    },
    configure: (server) => {
      const plansDir = path.resolve(process.cwd(), 'public', 'plans')
      const plansPdfMiddleware = (req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (!url.startsWith('/plans/') || (!url.endsWith('.pdf') && !url.endsWith('.PDF'))) {
          return next()
        }
        try {
          const pathPart = url.replace(/^\/plans\//, '').split('?')[0].trim()
          const fileName = pathPart.includes('%')
            ? decodeURIComponent(pathPart)
            : pathPart
          const filePath = path.join(plansDir, fileName)
          const safePath = path.normalize(filePath)
          if (!safePath.startsWith(plansDir)) return next()
          if (fs.existsSync(safePath)) {
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'inline')
            fs.createReadStream(safePath).pipe(res)
            return
          }
          const files = fs.readdirSync(plansDir)
          const match = files.find((f) => f.endsWith('.pdf') && fileName === f)
          if (match) {
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'inline')
            fs.createReadStream(path.join(plansDir, match)).pipe(res)
            return
          }
        } catch (_) {}
        next()
      }
      const developmentsDir = path.resolve(process.cwd(), 'public', 'developments')
      const developmentsMiddleware = (req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (!url.startsWith('/developments/')) return next()
        try {
          const pathPart = url.replace(/^\/developments\//, '').split('?')[0].trim()
          const fileName = pathPart.includes('%') ? decodeURIComponent(pathPart) : pathPart
          const filePath = path.join(developmentsDir, fileName)
          const safePath = path.normalize(filePath)
          if (!safePath.startsWith(developmentsDir)) return next()
          if (fs.existsSync(safePath)) {
            const ext = path.extname(fileName).toLowerCase()
            const mime =
              ext === '.pdf'
                ? 'application/pdf'
                : ext === '.ppt' || ext === '.pptx'
                  ? 'application/vnd.ms-powerpoint'
                  : 'application/octet-stream'
            res.setHeader('Content-Type', mime)
            res.setHeader('Content-Disposition', 'inline')
            fs.createReadStream(safePath).pipe(res)
            return
          }
          const files = fs.readdirSync(developmentsDir)
          const match = files.find((f) => fileName === f)
          if (match) {
            const ext = path.extname(match).toLowerCase()
            const mime =
              ext === '.pdf'
                ? 'application/pdf'
                : ext === '.ppt' || ext === '.pptx'
                  ? 'application/vnd.ms-powerpoint'
                  : 'application/octet-stream'
            res.setHeader('Content-Type', mime)
            res.setHeader('Content-Disposition', 'inline')
            fs.createReadStream(path.join(developmentsDir, match)).pipe(res)
            return
          }
        } catch (_) {}
        next()
      }
      // Run our middleware first so /plans/*.pdf and /developments/* are served before SPA fallback
      server.middlewares.stack.unshift({ route: '', handle: developmentsMiddleware })
      server.middlewares.stack.unshift({ route: '', handle: plansPdfMiddleware })
    }
  }
})
