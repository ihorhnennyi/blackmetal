import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from './locales/en.json'
import uaTranslations from './locales/ua.json'

const canUseLocalStorage = (): boolean => {
	try {
		const k = '__i18n_ls_chk'
		window.localStorage.setItem(k, '1')
		window.localStorage.removeItem(k)
		return true
	} catch {
		return false
	}
}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: enTranslations },
			ua: { translation: uaTranslations },
		},
		fallbackLng: 'ua',
		supportedLngs: ['en', 'ua'],
		// supportedLngs: ['ua'],
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: canUseLocalStorage() ? ['localStorage', 'navigator'] : ['navigator'],
			caches: canUseLocalStorage() ? ['localStorage'] : [],
			convertDetectedLanguage: lng => {
				return ['en', 'ua'].includes(lng) ? lng : 'ua'
				// return ['ua'].includes(lng) ? lng : 'ua'
			},
		},
	})

export default i18n
