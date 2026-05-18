const NEWS_FETCH_RETRIES = 3

async function fetchNewsJson(url: string): Promise<Response> {
	return fetch(url, {
		cache: 'no-store',
		headers: {
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			Pragma: 'no-cache',
		},
	})
}

/** Список новин у production — лише з /news-data.*.json, з агресивним cache-bust для Chrome desktop. */
export async function fetchProductionNewsData<T>(language: string): Promise<T> {
	const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')
	const metaBuildId = document
		.querySelector('meta[name="app-build-id"]')
		?.getAttribute('content')
	const buildId = metaBuildId || import.meta.env.VITE_BUILD_ID || '1'
	let lastError: unknown

	for (let attempt = 0; attempt < NEWS_FETCH_RETRIES; attempt++) {
		const bust = `${buildId}-${Date.now()}-${attempt}`
		const url = `${base}news-data.${language}.json?v=${encodeURIComponent(bust)}`

		try {
			const res = await fetchNewsJson(url)
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			return (await res.json()) as T
		} catch (e) {
			lastError = e
		}
	}

	throw lastError ?? new Error('news-data.json fetch failed')
}
