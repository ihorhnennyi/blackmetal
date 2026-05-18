import i18n from './i18n.config'
import { getBundledNews } from '@/i18n/newsBundle'
import { fetchProductionNewsData } from '@/utils/fetchNewsData'
import { mergeNewsLists } from '@/utils/mergeNewsLists'

/** i18n.language може бути uk, en-US тощо — папки лише en та ua */
function localeFolderForLoad(): string {
	const raw = (i18n.language || 'ua').split('-')[0].toLowerCase()
	if (raw === 'uk' || raw === 'ua') return 'ua'
	if (raw === 'en') return 'en'
	return 'ua'
}

export const loadTranslationData = async <T>(fileName: string): Promise<T> => {
	const language = localeFolderForLoad()

	if (fileName === 'news') {
		const bundled = getBundledNews<T>(language)

		if (import.meta.env.PROD) {
			try {
				const remote = await fetchProductionNewsData<T>(language)
				if (Array.isArray((remote as { news?: unknown }).news)) {
					return mergeNewsLists(bundled, remote)
				}
			} catch {
				/* news-data.json необовʼязковий — достатньо збірки */
			}
		}

		return bundled
	}

	try {
		return (await import(`./locales/${language}/${fileName}.json`)).default as T
	} catch (error) {
		console.error(
			`Error loading ${fileName} for language ${language} (i18n.language=${i18n.language}):`,
			error
		)
		if (language !== 'en') {
			return (await import(`./locales/en/${fileName}.json`)).default as T
		}
		throw error
	}
}
