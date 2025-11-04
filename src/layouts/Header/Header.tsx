import React, { useState } from 'react'
import { AppBar, Toolbar, Box, Divider, useTheme } from '@mui/material'
import {
	UniversalLogo,
	LanguageSwitcher,
	UniversalSearch,
	SocialLinks,
} from '@/components'
import { NavItem } from './components/NavItem'
import { BurgerMenu } from './components/BurgerMenu'
import { useTranslationData } from '@/hooks/useTranslationData'
import { NavigationData, HeaderTranslation } from './interface'

const Header = () => {
	const theme = useTheme()

	const { data: navigationData } = useTranslationData<NavigationData>('header')
	const { data: headerData, loading } =
		useTranslationData<HeaderTranslation>('header')

	const [hoveredItem, setHoveredItem] = useState<string | null>(null)
	const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [isSearchExpanded, setIsSearchExpanded] = useState(false)
	const [searchFocused, setSearchFocused] = useState(false)

	const handleMouseEnter = (id: string) => {
		setHoveredItem(id)
	}

	const handleMouseLeave = () => {
		setHoveredItem(null)
		setHoveredSubItem(null)
	}

	const handleSubItemMouseEnter = (id: string) => {
		setHoveredSubItem(id)
	}

	const handleSubItemMouseLeave = () => {
		setHoveredSubItem(null)
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	const handleSearchSubmit = (event: React.FormEvent) => {
		event.preventDefault()
	}

	if (!navigationData || loading || !headerData) {
		return null
	}

	return (
		<AppBar
			position='static'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#ffff',
				color: 'text.primary',
				boxShadow: 'none',
				width: '100%',
				height: { xxs: 'auto', sm: '165px' },
				py: { xxs: 2, sm: 0 },
				borderBottom: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Toolbar
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-around',
					maxWidth: 'xxl',
					minWidth: 'xxs',
					width: '90%',
					height: { xxs: 'auto', sm: '140px' },
					gap: { xxs: 2, sm: 0 },
					p: '0px !important',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: { xxs: '100%', sm: '98%' },
						flexDirection: { xxs: 'row', sm: 'row' },
						gap: { xxs: 2, sm: 0 },
					}}
				>
					<UniversalLogo type='icon-text' />

					<Box
						sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
					>
						<Box
							sx={{
								display: { xxs: 'none', sm: 'flex' },
								alignItems: 'center',
								gap: '20px',
								transition: 'all 0.5s ease-in-out',
							}}
							onMouseEnter={() => setIsSearchExpanded(true)}
							onMouseLeave={() => {
								if (!searchFocused) {
									setIsSearchExpanded(false)
								}
							}}
							tabIndex={-1}
						>
							<SocialLinks />
							{/* <UniversalSearch
								placeholderKey={headerData?.searchPlaceholder}
								onSearch={() => {}}
								isExpanded={isSearchExpanded}
								onFocus={() => {
									setSearchFocused(true)
									setIsSearchExpanded(true)
								}}
								onBlur={() => {
									setSearchFocused(false)
									setIsSearchExpanded(false)
								}}
								sx={{
									border: '1px solid',
									borderColor: isSearchExpanded ? '#C7C7C7' : 'transparent',
									width: isSearchExpanded ? '375px' : '50px',
									height: '50px',
									overflow: 'hidden',
									transition: 'all 0.5s ease-in-out',
									pr: 1,
									'&:hover': {
										borderColor: '#C7C7C7',
									},
								}}
							/> */}
						</Box>

						<Box sx={{ ml: '20px' }}>
							<LanguageSwitcher />
						</Box>
						<BurgerMenu navItems={navigationData.navItems} />
					</Box>
				</Box>

				<Divider
					sx={{
						width: '98%',
						height: '1px',
						mx: 'auto',
						mt: { xxs: 0, sm: 3 },
						mb: { xxs: 0, sm: 1 },
						display: { xxs: 'none', sm: 'block' },
					}}
				/>

				<Box
					sx={{
						display: { xxs: 'none', sm: 'flex' },
						alignItems: 'center',
						justifyContent: 'space-between',
						flexWrap: 'wrap',
						width: '100%',
						maxWidth: 'xxxl',
						px: 2,
						boxSizing: 'border-box',
					}}
				>
					{navigationData.navItems.map(item => (
						<NavItem
							key={item.id}
							item={item}
							hoveredItem={hoveredItem}
							hoveredSubItem={hoveredSubItem}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							onSubItemMouseEnter={handleSubItemMouseEnter}
							onSubItemMouseLeave={handleSubItemMouseLeave}
						/>
					))}
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
