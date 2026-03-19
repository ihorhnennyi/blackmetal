/**
 * Кодує сегменти шляху до файлів з `public/`, щоб кирилиця, пробіли та `+`
 * коректно працювали в `<img src>` і в CSS `url(...)`.
 */
export function encodePublicAssetPath(path: string): string {
	if (!path || /^https?:\/\//i.test(path)) return path
	if (path.includes('%')) return path
	return path
		.split('/')
		.map(segment => (segment ? encodeURIComponent(segment) : ''))
		.join('/')
}
