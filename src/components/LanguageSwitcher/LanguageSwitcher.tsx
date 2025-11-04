import React, { useState, useEffect } from 'react'
import {
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Typography,
	styled,
} from '@mui/material'
import { Language as LanguageIcon } from '@mui/icons-material'
import { GB as EnFlag, UA as UkFlag } from 'country-flag-icons/react/3x2'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcherProps, Language, LangTranslation } from './interfaces'
import { useTranslationData } from '@/hooks/useTranslationData'

const MAIN_COLOR = '#2D7A84'
const HIGHLIGHT_COLOR = 'rgba(45, 122, 132, 0.15)'

const FlagIcon = ({ code }: { code: string }) => {
	switch (code) {
		case 'en':
			return <EnFlag style={{ width: '20px', height: '15px' }} />
		case 'ua':
			return <UkFlag style={{ width: '20px', height: '15px' }} />
		default:
			return <LanguageIcon fontSize='small' />
	}
}

const StyledMenu = styled(Menu)(() => ({
	'& .MuiPaper-root': {
		borderRadius: '8px',
		backgroundColor: '#ffffff',
		color: MAIN_COLOR,
		minWidth: '180px',
		boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
		position: 'absolute',
		zIndex: 9999,
	},
	'& .MuiMenuItem-root': {
		margin: '0 8px',
		borderRadius: '4px',
		'&:hover': {
			backgroundColor: HIGHLIGHT_COLOR,
		},
		'&.Mui-selected': {
			backgroundColor: HIGHLIGHT_COLOR,
			fontWeight: 600,
		},
	},
}))

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
	onLanguageChange,
	initialLanguage,
	sx,
	iconColor = MAIN_COLOR,
}) => {
	const { i18n } = useTranslation()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const { data: langData, loading } = useTranslationData<LangTranslation>('lang')
	const languages: Language[] =
		!loading && langData
			? Object.entries(langData.languages).map(([code, name]) => ({ code, name }))
			: []

	useEffect(() => {
		if (initialLanguage && i18n.language !== initialLanguage) {
			i18n.changeLanguage(initialLanguage)
		}
	}, [initialLanguage, i18n])

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleSelect = (code: string) => {
		i18n.changeLanguage(code)
		onLanguageChange?.(code)
		handleClose()
	}

	const currentLangCode = i18n.language
	const currentLangShort =
		languages.find(lang => lang.code === currentLangCode)?.code.toUpperCase() ||
		currentLangCode.toUpperCase()

	if (loading || !languages.length) return null

	return (
		<div style={{ position: 'relative' }}>
			<IconButton
				onClick={handleClick}
				size='small'
				sx={{ color: iconColor, display: 'flex', alignItems: 'center', gap: '6px', ...sx }}
				aria-controls={open ? 'language-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
			>
				<LanguageIcon fontSize='medium' />
				<Typography variant='body2' sx={{ fontWeight: 500 }}>
					{currentLangShort}
				</Typography>
			</IconButton>

			<StyledMenu
				id='language-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'language-button',
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				disableScrollLock={true}
				disablePortal={false}
				slotProps={{
					paper: {
						style: {
							position: 'fixed',
							zIndex: 9999,
						}
					}
				}}
			>
				{languages.map(lang => (
					<MenuItem
						key={lang.code}
						selected={lang.code === currentLangCode}
						onClick={() => handleSelect(lang.code)}
					>
						<ListItemIcon sx={{ color: 'inherit', minWidth: '32px' }}>
							<FlagIcon code={lang.code} />
						</ListItemIcon>
						<ListItemText>{lang.name}</ListItemText>
					</MenuItem>
				))}
			</StyledMenu>
		</div>
	)
}

export default LanguageSwitcher
