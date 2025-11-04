import React, { useRef, useState } from 'react'
import {
	Button,
	MenuItem,
	Typography,
	Box,
	Fade,
	Link as MUILink,
} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { NavItem as NavItemType } from '../../interface'
import { DropdownMenu, NestedDropdownMenu, LineDivider } from '../'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface NavItemProps {
	item: NavItemType
	level?: number
	// эти пропсы оставлены опциональными для совместимости с существующим вызовом
	hoveredItem?: string | null
	hoveredSubItem?: string | null
	onMouseEnter?: (id: string) => void
	onMouseLeave?: () => void
	onSubItemMouseEnter?: (id: string) => void
	onSubItemMouseLeave?: () => void
}

export const NavItem = ({
	item,
	level = 0,
	hoveredItem,
	onMouseEnter,
	onMouseLeave,
}: NavItemProps) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	// путь открытых пунктов: [id уровня 1, id уровня 2, id уровня 3, ...]
	const [openPath, setOpenPath] = useState<string[]>([])
	const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

	const enterAtLevel = (id: string, lvl: number) => {
		if (closeTimeout.current) clearTimeout(closeTimeout.current)
		setOpenPath(prev => {
			const next = prev.slice(0, lvl) // обрезаем глубже текущего уровня
			next[lvl] = id // фиксируем id на этом уровне
			return next
		})
	}

	const leaveAtLevel = (lvl: number) => {
		if (closeTimeout.current) clearTimeout(closeTimeout.current)
		// задержка, чтобы успеть «проехать» мышью в следующий уровень
		closeTimeout.current = setTimeout(() => {
			setOpenPath(prev => prev.slice(0, Math.max(0, lvl))) // закрываем текущий уровень и глубже
		}, 250)
	}

	// универсальный рекурсивный рендер
	const renderMenuItems = (
		items: NavItemType[],
		parentId: string,
		lvl: number = 0
	) => {
		return items.map((subItem, index) => {
			const hasChildren = !!subItem.items?.length

			if (hasChildren) {
				const isOpenHere = openPath[lvl] === subItem.id

				return (
					<Box
						key={subItem.id}
						sx={{
							color: '#373737',
							position: 'relative',
							minHeight: '50px',
							py: 1,
							display: 'flex',
							alignItems: 'center',
							'&:hover': { backgroundColor: '#2D7A84', color: '#fff' },
						}}
						onMouseEnter={() => enterAtLevel(subItem.id, lvl)}
						onMouseLeave={() => leaveAtLevel(lvl)}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								px: 2,
							}}
						>
							<Typography
								fontWeight='bold'
								sx={{
									whiteSpace: 'normal',
									wordBreak: 'break-word',
									overflowWrap: 'anywhere',
									maxWidth: '100%',
								}}
							>
								{t(subItem.label)}
							</Typography>
							<KeyboardArrowRightIcon fontSize='small' />
						</Box>

						<Fade in={isOpenHere} timeout={200}>
							<NestedDropdownMenu>
								{subItem.items &&
									renderMenuItems(subItem.items, subItem.id, lvl + 1)}
							</NestedDropdownMenu>
						</Fade>
					</Box>
				)
			}

			// конечный элемент (ссылка/навигация)
			const isJournal =
				subItem.label === 'Collection of Scientific Works' ||
				subItem.label === 'Збірник наукових праць'

			return (
				<React.Fragment key={subItem.id}>
					{subItem.link ? (
						<MUILink
							href={isJournal ? 'https://jrn.isi.gov.ua/' : subItem.link}
							target={subItem.link.startsWith('http') ? '_blank' : undefined}
							rel='noopener noreferrer'
							sx={{ textDecoration: 'none' }}
						>
							<MenuItem
								sx={{
									minHeight: '50px',
									py: 1,
									color: '#373737',
									'&:hover': { backgroundColor: '#2D7A84', color: '#fff' },
								}}
							>
								<Typography
									fontWeight='bold'
									sx={{
										whiteSpace: 'normal',
										wordBreak: 'break-word',
										overflowWrap: 'anywhere',
										maxWidth: '100%',
									}}
								>
									{t(subItem.label)}
								</Typography>
							</MenuItem>
						</MUILink>
					) : (
						<MenuItem
							onClick={() => subItem.href && navigate(subItem.href)}
							sx={{
								minHeight: '50px',
								py: 1,
								color: '#373737',
								'&:hover': { backgroundColor: '#2D7A84', color: '#fff' },
							}}
						>
							<Typography
								fontWeight='bold'
								sx={{
									whiteSpace: 'normal',
									wordBreak: 'break-word',
									overflowWrap: 'anywhere',
									maxWidth: '100%',
								}}
							>
								{t(subItem.label)}
							</Typography>
						</MenuItem>
					)}
					{index < items.length - 1 && <LineDivider />}
				</React.Fragment>
			)
		})
	}

	// простой пункт верхнего уровня без детей
	if (item.href) {
		return (
			<Button
				key={item.id}
				sx={{
					color: '#373737',
					textTransform: 'none',
					fontSize: { xs: '0.7rem', md: '1rem' },
					fontWeight: 'bold',
					px: { xs: 1, md: 2 },
					py: { xs: 1.5, md: 0 },
					'&:hover': {
						color: '#2D7A84',
						backgroundColor: { xs: 'rgba(0,0,0,0.05)', sm: 'transparent' },
					},
				}}
				onClick={() => navigate(item.href!)}
			>
				{t(item.label)}
			</Button>
		)
	}

	// пункт с детьми
	if (item.items?.length) {
		const isTopOpen = hoveredItem === item.id // управление открытием первого уровня остаётся внешним

		if (isMobile) {
			// мобильная версия — просто рекурсивный список (без hover-логики)
			return (
				<Box key={item.id} sx={{ width: '100%' }}>
					<Button
						sx={{
							color: '#373737',
							textTransform: 'none',
							fontSize: '1.2rem',
							fontWeight: 'bold',
							px: 0,
							py: 1.5,
							width: '100%',
							justifyContent: 'flex-start',
							'&:hover': {
								color: '#2D7A84',
								backgroundColor: 'rgba(0,0,0,0.05)',
							},
						}}
					>
						{t(item.label)}
					</Button>

					<Box sx={{ pl: 2, mt: 1 }}>
						{item.items.map(subItem => (
							<NavItem key={subItem.id} item={subItem} level={level + 1} />
						))}
					</Box>
				</Box>
			)
		}

		// десктоп — выпадающее меню; дальше управление уровнями идёт через openPath
		return (
			<Box
				key={item.id}
				sx={{ position: 'relative' }}
				onMouseEnter={() => onMouseEnter?.(item.id)}
				onMouseLeave={() => {
					// закрываем всё при уходе с первого уровня
					if (closeTimeout.current) clearTimeout(closeTimeout.current)
					setOpenPath([])
					onMouseLeave?.()
				}}
			>
				<Button
					sx={{
						color: isTopOpen ? '#2D7A84' : '#373737',
						textTransform: 'none',
						fontSize: { xs: '0.7rem', md: '1rem' },
						fontWeight: 'bold',
						px: { xs: 1, md: 2 },
						'&:hover': { color: '#2D7A84', backgroundColor: 'transparent' },
					}}
				>
					{t(item.label)}
				</Button>

				<Fade in={isTopOpen} timeout={200}>
					<DropdownMenu>{renderMenuItems(item.items, item.id, 0)}</DropdownMenu>
				</Fade>
			</Box>
		)
	}

	return null
}
