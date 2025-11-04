import { SxProps } from '@mui/material'

export interface Language {
	code: string
	name: string
}

export interface LanguageSwitcherProps {
	languages?: Language[]
	onLanguageChange?: (code: string) => void
	initialLanguage?: string
	sx?: SxProps
	iconColor?: string
}

export interface LangTranslation {
	languages: Record<string, string>
}
