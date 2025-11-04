import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

interface DepartmentElementProps {
	fullName: string
	img: string
	href: string
}

const DepartmentElement: React.FC<DepartmentElementProps> = ({
	fullName,
	img,
	href,
}) => {
	return (
		<Box
			component={Link}
			to={href}
			sx={{
				flex: '1 1 calc(25% - 20px)',
				maxWidth: {
					xxl: '460px',
				},
				minWidth: '260px',
				minHeight: '120px',
				height: {
					xxs: '120px',
					xxl: '145px',
				},
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'row',
				gap: '20px',
				backgroundColor: '#fff',
				boxShadow: '0px 5px 100px 0px rgba(0, 0, 0, 0.15)',
				textDecoration: 'none',
				transition: 'all 0.3s ease',
				'&:hover .svg-logo': {
					filter:
						'brightness(0) saturate(100%) invert(30%) sepia(15%) saturate(1826%) hue-rotate(147deg) brightness(94%) contrast(87%)',
				},
				'&:hover .department-text': {
					color: '#2D7A84',
				},
				'@media (max-width: 1900px)': { flex: '1 1 calc(33.33% - 20px)' },
				'@media (max-width: 1536px)': { flex: '1 1 calc(33.33% - 20px)' },
				'@media (max-width: 1200px)': { flex: '1 1 calc(50% - 20px)' },
				'@media (max-width: 900px)': { flex: '1 1 100%' },
			}}
		>
			<Box
				sx={{
					width: {
						xxs: '50px',
						xxl: '80px',
					},
					height: {
						xxs: '50px',
						xxl: '80px',
					},
					ml: 2,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexShrink: 0,
				}}
			>
				<Box
					component='img'
					src={img}
					className='svg-logo'
					sx={{
						width: {
							xxs: '50px',
							xxl: '80px',
						},
						height: {
							xxs: '50px',
							xxl: '80px',
						},
						objectFit: 'contain',
						filter:
							'brightness(0) saturate(100%) invert(91%) sepia(0%) saturate(5%) hue-rotate(163deg) brightness(91%) contrast(88%)',
						transition: 'filter 0.3s ease-in-out',
					}}
				/>
			</Box>

			<Box sx={{ mr: 2 }}>
				<Box
					className='department-text'
					sx={{
						fontSize: { xxs: '19px', xxl: '21px' },
						color: 'black',
						transition: 'color 0.3s ease',
					}}
				>
					{fullName}
				</Box>
			</Box>
		</Box>
	)
}

export default DepartmentElement
