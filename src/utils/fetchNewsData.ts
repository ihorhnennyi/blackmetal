const NEWS_FETCH_RETRIES = 3

function newsDataBaseUrl(): string {
	const base = import.meta.env.BASE_URL || '/'
	if (base.startsWith('http://') || base.startsWith('https://')) {
		return base.replace(/\/?$/, '/')
	}
	return `${window.location.origin}${base.startsWith('/') ? base : `/${base}`}`.replace(/\/?$/, '/')
}

async function fetchNewsJson(url: string): Promise<Response> {
	return fetch(url, {
		cache: 'no-store',
		credentials: 'same-origin',
		headers: {
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			Pragma: 'no-cache',
		},
	})
}

/** Додаткове джерело новин з dist/news-data.*.json (не блокує сайт, якщо файлу немає). */
export async function fetchProductionNewsData<T>(language: string): Promise<T> {
	const base = newsDataBaseUrl()
	const buildId =
		document.querySelector('meta[name="app-build-id"]')?.getAttribute('content') ||
		import.meta.env.VITE_BUILD_ID ||
		'1'
	let lastError: unknown

	const urls = [
		...Array.from({ length: NEWS_FETCH_RETRIES }, (_, attempt) => {
			const bust = `${buildId}-${Date.now()}-${attempt}`
			return `${base}news-data.${language}.json?v=${encodeURIComponent(bust)}`
		}),
		`${base}news-data.${language}.json`,
	]

	for (const url of urls) {
		try {
			const res = await fetchNewsJson(url)
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const data = (await res.json()) as T
			if (!data || typeof data !== 'object') throw new Error('Invalid JSON')
			return data
		} catch (e) {
			lastError = e
		}
	}

	throw lastError ?? new Error('news-data.json fetch failed')
}
