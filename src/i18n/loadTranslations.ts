import i18n from './i18n.config'
import { fetchProductionNewsData } from '@/utils/fetchNewsData'

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

	// У production — тільки news-data.json (без fallback на застарілий chunk у кеші Chrome)
	if (fileName === 'news' && import.meta.env.PROD) {
		try {
			return await fetchProductionNewsData<T>(language)
		} catch (e) {
			console.error('news-data.json unavailable', e)
			throw e
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
