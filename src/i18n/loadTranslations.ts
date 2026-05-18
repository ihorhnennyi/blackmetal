import i18n from './i18n.config'

/** i18n.language може бути uk, en-US тощо — папки лише en та ua */
function localeFolderForLoad(): string {
	const raw = (i18n.language || 'ua').split('-')[0].toLowerCase()
	if (raw === 'uk' || raw === 'ua') return 'ua'
	if (raw === 'en') return 'en'
	return 'ua'
}

function mergeNewsBundle(translationData: any, commonData: any) {
	const mergedNews = commonData.news.map((commonItem: any) => {
		const translationItem = translationData.news.find((item: any) => item.id === commonItem.id)
		return {
			...commonItem,
			title: translationItem?.title || '',
			text: translationItem?.text || '',
			content: translationItem?.content || undefined,
		}
	})
	return {
		...translationData,
		news: mergedNews,
	}
}

async function loadNewsMerged<T>(language: string): Promise<T> {
	const translationData = (await import(`./locales/${language}/news.json`)).default
	const commonData = (await import('@/data/newsData.json')).default
	return mergeNewsBundle(translationData, commonData) as T
}

export const loadTranslationData = async <T>(fileName: string): Promise<T> => {
	const language = localeFolderForLoad()

	// У production список новин з окремого JSON + no-store, щоб не залежати від кешу головного chunk у Chrome
	if (fileName === 'news' && import.meta.env.PROD) {
		try {
			const buildId = import.meta.env.VITE_BUILD_ID
			const url = `${import.meta.env.BASE_URL}news-data.${language}.json?v=${encodeURIComponent(buildId)}`
			const res = await fetch(url, { cache: 'no-store' })
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			return (await res.json()) as T
		} catch (e) {
			console.error('news-data.json fetch failed, fallback to bundled news', e)
		}
	}

	try {
		if (fileName === 'news') {
			return await loadNewsMerged<T>(language)
		}
		return (await import(`./locales/${language}/${fileName}.json`)).default as T
	} catch (error) {
		console.error(
			`Error loading ${fileName} for language ${language} (i18n.language=${i18n.language}):`,
			error
		)
		if (fileName === 'news') {
			return await loadNewsMerged<T>('en')
		}
		return (await import(`./locales/en/${fileName}.json`)).default as T
	}
}
