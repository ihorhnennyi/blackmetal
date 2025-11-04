import { useTranslation } from 'react-i18next'

export const isUrl = (value: string) => {
	if (typeof value !== 'string') {
		return false
	}
	return value.startsWith('http://') || value.startsWith('https://')
}

export const getContactDisplayValue = (contactType: string, t: (key: string) => string) => {
	const type = contactType.toLowerCase()
	const normalized = type.replace(/\s+/g, '')
	
	if (type === 'encyclopedia' || type === 'енциклопедія') {
		return t('contacts.encyclopedia')
	} else if (type === 'google scholar') {
		return t('contacts.googleScholar')
	} else if (type === 'orcid id') {
		return t('contacts.orcid')
	} else if (type === 'scopus author id') {
		return t('contacts.scopus')
	} else if (normalized === 'webofscience' || normalized === 'webofscienceid' || normalized === 'researcherid') {
		return t('contacts.webofscience')
	} else if (normalized === 'sciprofiles' || normalized === 'sciprofile') {
		return t('contacts.sciprofiles')
	} else if (normalized === 'researchgate') {
		return t('contacts.researchgate')
	} else if (normalized === 'bibliographic' || normalized === 'bibliography') {
		return t('contacts.bibliographic')
	}  else {
		return null
	}
} 