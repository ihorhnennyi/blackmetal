import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface LatestNewsElementProps {
	title: string
	description: string
	image: string
	link: string
}

const lineClampStyles = {
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
}

const LatestNewsElement: React.FC<LatestNewsElementProps> = ({
	title,
	description,
	image,
	link,
}) => {
	const { t } = useTranslation()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: 300,
				display: 'flex',
				flexDirection: 'column',
				gap: 1,
				mx: 'auto',
			}}
		>
			<Box
				sx={{
					width: '100%',
					height: 0,
					paddingBottom: '58%', 
					backgroundImage: `url(${image})`,
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					position: 'relative',
					overflow: 'hidden',
					'&:hover .overlay': { opacity: 1 },
					backgroundColor: '#fff',
				}}
			>
				<Box
					className='overlay'
					sx={{
						position: 'absolute',
						inset: 0,
						backgroundColor: 'rgba(20, 41, 52, 0.8)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						opacity: 0,
						transition: 'opacity 0.3s ease-in-out',
					}}
				>
					<Button
						component={Link}
						to={link}
						variant='outlined'
						sx={{
							color: '#fff',
							borderColor: '#fff',
							borderRadius: 0,
							textTransform: 'none',
							fontSize: 14,
							padding: '4px 16px',
						}}
					>
						{t('buttonNews.go')}
					</Button>
				</Box>
			</Box>

			<Typography
				fontWeight={700}
				fontSize={19}
				component={Link}
				to={link}
				sx={{
					...lineClampStyles,
					WebkitLineClamp: 2,
					color: '#2D7A84',
					textDecoration: 'none',
					textAlign: isMobile ? 'center' : 'left',
				}}
			>
				{title}
			</Typography>

			<Typography
				fontSize={16}
				sx={{
					...lineClampStyles,
					WebkitLineClamp: 2,
					textAlign: isMobile ? 'center' : 'left',
				}}
			>
				{description}
			</Typography>
		</Box>
	)
}

export default LatestNewsElement