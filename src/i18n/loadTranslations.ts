import i18n from './i18n.config'

/** i18n.language може бути uk, en-US тощо — папки лише en та ua */
function localeFolderForLoad(): string {
	const raw = (i18n.language || 'ua').split('-')[0].toLowerCase()
	if (raw === 'uk' || raw === 'ua') return 'ua'
	if (raw === 'en') return 'en'
	return 'ua'
}

export const loadTranslationData = async <T>(fileName: string): Promise<T> => {
	const language = localeFolderForLoad()
	try {
		const translationData = await import(`./locales/${language}/${fileName}.json`)
		
		if (fileName === 'news') {
			const commonData = await import('@/data/newsData.json')
			
			const mergedNews = commonData.default.news.map((commonItem: any) => {
				const translationItem = translationData.default.news.find((item: any) => item.id === commonItem.id)
				return {
					...commonItem,
					title: translationItem?.title || '',
					text: translationItem?.text || '',
					content: translationItem?.content || undefined
				}
			})
			
			return {
				...translationData.default,
				news: mergedNews
			} as T
		}
		
		return translationData.default as T
	} catch (error) {
		console.error(
			`Error loading ${fileName} for language ${language} (i18n.language=${i18n.language}):`,
			error
		)
		const fallbackData = await import(`./locales/en/${fileName}.json`)
		
		if (fileName === 'news') {
			const commonData = await import('@/data/newsData.json')
			
			const mergedNews = commonData.default.news.map((commonItem: any) => {
				const translationItem = fallbackData.default.news.find((item: any) => item.id === commonItem.id)
				return {
					...commonItem,
					title: translationItem?.title || '',
					text: translationItem?.text || '',
					content: translationItem?.content || undefined
				}
			})
			
			return {
				...fallbackData.default,
				news: mergedNews
			} as T
		}
		
		return fallbackData.default as T
	}
}
