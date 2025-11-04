import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from './locales/en.json'
import uaTranslations from './locales/ua.json'

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
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			convertDetectedLanguage: lng => {
				return ['en', 'ua'].includes(lng) ? lng : 'ua'
				// return ['ua'].includes(lng) ? lng : 'ua'
			},
		},
	})

export default i18n
