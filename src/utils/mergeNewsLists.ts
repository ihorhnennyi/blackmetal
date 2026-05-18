type NewsEntry = { id: number; [key: string]: unknown }

type NewsBundle = {
	newsTitle?: string
	news: NewsEntry[]
}

/**
 * База — збірка (завжди є після деплою).
 * remote перезаписує існуючі id і додає нові (актуальний news-data.json з сервера).
 */
export function mergeNewsLists<T extends NewsBundle>(bundled: T, remote: T): T {
	const byId = new Map<number, NewsEntry>()

	for (const item of bundled.news) {
		byId.set(item.id, item)
	}
	for (const item of remote.news) {
		byId.set(item.id, item)
	}

	const news = Array.from(byId.values()).sort((a, b) => a.id - b.id)
	return {
		...bundled,
		newsTitle: remote.newsTitle || bundled.newsTitle,
		news,
	} as T
}
