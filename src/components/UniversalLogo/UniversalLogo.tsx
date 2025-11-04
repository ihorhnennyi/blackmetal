import React from 'react'
import { Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { UniversalLogoProps } from './LogoInterface'
import { useTranslation } from 'react-i18next'

const UniversalLogo: React.FC<UniversalLogoProps> = ({
	size,
	type = 'icon',
}) => {
	const navigate = useNavigate()
	const location = useLocation()
	const { t } = useTranslation()

	const handleLogoClick = () => {
		if (location.pathname === '/') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		} else {
			navigate('/')
		}
	}

	const logoText = t('logo.text')

	return (
		<Box
			onClick={handleLogoClick}
			sx={{
				cursor: 'pointer',
				display: 'inline-block',
				'&:hover': {
					opacity: 0.8,
					transition: 'opacity 0.2s ease',
				},
			}}
		>
			{type === 'icon' ? (
				<Box
					component='img'
					src='/isi.jpg'
					alt='logo'
					sx={{
						height: size,
						display: 'block',
					}}
				/>
			) : (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '7px',
					}}
				>
					<Box
						component='img'
						src='/isi.jpg'
						alt='logo'
						sx={{
							width: { xxs: '40px', sm: '60px' },
						}}
					/>
					<Box
						component='span'
						dangerouslySetInnerHTML={{ __html: logoText }}
						sx={{
							fontWeight: 'bold',
							fontSize: { xxs: '10px', sm: '13px' },
							lineHeight: 1.2,
							maxWidth: { xxs: '180px', sm: '100%' },
						}}
					/>
				</Box>
			)}
		</Box>
	)
}

export default UniversalLogo
