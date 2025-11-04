import { Typography, Box, Container, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import backgroundImage from '../../assets/images/1.jpg'

const NotFoundPage = () => {
	const { t } = useTranslation()

	return (
		<Box
			sx={{
				minHeight: '100vh',
				width: '100%',
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden',
				padding: { xs: '20px', sm: '40px' },
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(20, 41, 52, 0.8)',
					zIndex: 1,
				},
			}}
		>
			<Container
				sx={{
					position: 'relative',
					zIndex: 2,
					textAlign: 'center',
					color: '#fff',
					backdropFilter: 'blur(10px)',
					backgroundColor: 'rgba(255, 255, 255, 0.1)',
					borderRadius: { xs: '15px', sm: '20px' },
					padding: { xs: '30px 20px', sm: '40px 30px', md: '50px 40px' },
					border: '1px solid rgba(255, 255, 255, 0.2)',
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
					maxWidth: { xs: '280px', sm: '400px', md: '500px' },
					width: { xs: 'auto', sm: '90%', md: 'auto' },
					minHeight: { xs: 'auto', sm: 'auto' },
					marginX: { xs: '20px', sm: 0 },
					'@media (max-width: 480px)': {
						maxWidth: '380px',
						width: '90%',
						padding: '40px 20px',
						borderRadius: '20px',
					},
				}}
			>
				<Typography 
					variant='h1' 
					sx={{ 
						fontSize: { xs: '4rem', sm: '5rem', md: '6rem', lg: '7rem' },
						fontWeight: 700,
						mb: { xs: 1, sm: 2 },
						textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
						lineHeight: 1,
					}}
				>
					404
				</Typography>
				<Typography 
					variant='h4' 
					sx={{ 
						fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem' },
						fontWeight: 500,
						mb: { xs: 2, sm: 3 },
						textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
						lineHeight: 1.2,
						px: { xs: 1, sm: 0 },
					}}
				>
					{t('notFound.title')}
				</Typography>
				<Button
					component={Link}
					to="/"
					variant="contained"
					sx={{
						backgroundColor: 'rgba(255, 255, 255, 0.2)',
						color: '#fff',
						border: '1px solid rgba(255, 255, 255, 0.3)',
						padding: { xs: '10px 20px', sm: '12px 24px', md: '14px 28px' },
						fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
						fontWeight: 500,
						textTransform: 'none',
						borderRadius: { xs: '8px', sm: '10px' },
						backdropFilter: 'blur(10px)',
						width: { xs: '100%', sm: 'auto' },
						minWidth: { xs: 'auto', sm: '200px' },
						'&:hover': {
							backgroundColor: 'rgba(255, 255, 255, 0.3)',
							border: '1px solid rgba(255, 255, 255, 0.5)',
							transform: 'translateY(-2px)',
							boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
						},
						transition: 'all 0.3s ease',
						'@media (max-width: 480px)': {
							borderRadius: '10px',
							marginTop: '15px',
						},
					}}
				>
					{t('notFound.backButton')}
				</Button>
			</Container>
		</Box>
	)
}

export default NotFoundPage
