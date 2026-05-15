import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'

export default defineConfig({
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
  plugins: [react()],
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
