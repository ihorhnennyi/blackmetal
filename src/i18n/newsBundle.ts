import uaNews from './locales/ua/news.json'
import enNews from './locales/en/news.json'
import newsData from '@/data/newsData.json'

function mergeNewsBundle(translationData: typeof uaNews, commonData: typeof newsData) {
	const mergedNews = commonData.news.map(commonItem => {
		const translationItem = translationData.news.find(item => item.id === commonItem.id)
		return {
			...commonItem,
			title: translationItem?.title || '',
			text: translationItem?.text || '',
			content: translationItem?.content,
		}
	})
	return {
		...translationData,
		news: mergedNews,
	}
}

/** Новини зі збірки (той самий hash, що й index.html — працює в усіх браузерах). */
export function getBundledNews<T>(language: string): T {
	const translationData = language === 'en' ? enNews : uaNews
	return mergeNewsBundle(translationData, newsData) as T
}
