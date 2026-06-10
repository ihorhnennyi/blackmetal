import fs from 'fs'
import path from 'path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const publicDir = path.join(root, 'public')

function collectLinks(value, links = new Set()) {
	if (
		typeof value === 'string' &&
		value.startsWith('/') &&
		!value.startsWith('//') &&
		/\.[a-z0-9]+$/i.test(value)
	) {
		links.add(value.split('?')[0])
		return links
	}
	if (Array.isArray(value)) {
		value.forEach(item => collectLinks(item, links))
	} else if (value && typeof value === 'object') {
		Object.values(value).forEach(item => collectLinks(item, links))
	}
	return links
}

function resolveFile(baseDir, link) {
	const relative = decodeURIComponent(link.slice(1))
	const target = path.join(baseDir, relative)
	if (fs.existsSync(target)) return target

	const parent = path.dirname(target)
	const base = path.basename(target).normalize('NFC')
	if (!fs.existsSync(parent)) return null

	const match = fs
		.readdirSync(parent)
		.find(name => name.normalize('NFC') === base)
	return match ? path.join(parent, match) : null
}

if (!fs.existsSync(distDir)) {
	console.error('dist/ not found — run npm run build first')
	process.exit(1)
}

const missing = []
for (const lang of ['ua', 'en']) {
	const localeDir = path.join(root, 'src/i18n/locales', lang)
	for (const file of fs.readdirSync(localeDir).filter(name => name.endsWith('.json'))) {
		const data = JSON.parse(fs.readFileSync(path.join(localeDir, file), 'utf-8'))
		for (const link of collectLinks(data)) {
			if (!resolveFile(publicDir, link)) continue
			if (!resolveFile(distDir, link)) {
				missing.push({ lang, file, link })
			}
		}
	}
}

if (missing.length > 0) {
	console.error('Files exist in public/ but missing in dist/ after build:')
	for (const item of missing) {
		console.error(`  ${item.link}  ←  ${item.lang}/${item.file}`)
	}
	process.exit(1)
}

console.log('OK: public/ assets linked in JSON are present in dist/')
