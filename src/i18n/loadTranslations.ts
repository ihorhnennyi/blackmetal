import i18n from './i18n.config'

export const loadTranslationData = async <T>(fileName: string): Promise<T> => {
	const language = i18n.language
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
		console.error(`Error loading ${fileName} for language ${language}:`, error)
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
