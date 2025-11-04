import { FC, useState, useEffect } from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { HeroSectionProps } from './types'
import { useNavigate } from 'react-router-dom'
import image1 from '../../../../assets/images/1.jpg'
import image2 from '../../../../assets/images/2.jpg'
import image3 from '../../../../assets/images/3.jpg'
import image4 from '../../../../assets/images/4.jpg'
import image5 from '../../../../assets/images/5.jpg'
import image6 from '../../../../assets/images/6.jpg'
import { Modal } from '../../../../components/Modal'
import { FeedbackForm } from '../../../../components/FeedbackForm/FeedbackForm'
import { useTranslation } from 'react-i18next'

const HeaderContainer = styled(Box)({
	width: '100%',
	position: 'relative',
	marginBottom: '2rem',
	overflow: 'hidden',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})

const HeaderImage = styled('img')({
	width: '100%',
	height: '100%',
	display: 'block',
	objectFit: 'cover',
	position: 'absolute',
	top: 0,
	left: 0,
	transition: 'opacity 1s ease-in-out',
})

const Overlay = styled(Box)({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(20, 41, 52, 0.8)',
	display: 'flex',
	alignItems: 'center',
	zIndex: 2,
})

const ContentWrapper = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: '2rem',
	paddingLeft: '2rem',
})

const Hashtag = styled(Typography)(({ theme }) => ({
	color: '#fff',
	textAlign: 'left',
	fontSize: '6rem',
	fontWeight: 700,
	textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
	[theme.breakpoints.down('md')]: {
		fontSize: '4rem',
	},
	[theme.breakpoints.down('sm')]: {
		fontSize: '3rem',
	},
}))

const StyledButton = styled(Button)(({ theme }) => ({
	color: '#fff',
	borderColor: '#fff',
	padding: '12px 32px',
	fontSize: '1.2rem',
	borderRadius: 0,
	'&:hover': {
		borderColor: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
}))

export const HeroSection: FC<HeroSectionProps> = ({
	image,
	overlay = true,
}) => {
	const navigate = useNavigate()
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const images = [image1, image2, image3, image4, image5, image6]
	const { t } = useTranslation()

	const logoText = t('logo.text')
	const logoParts = logoText.split('<br />')

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
		}, 5000)

		return () => clearInterval(interval)
	}, [images.length])

	const handleButtonClick = () => {
		setIsModalOpen(true)
	}

	return (
		<>
			<HeaderContainer
				sx={{
					height: 'calc(100vh - 165px)',
					minHeight: '500px',
					width: '100%',
					position: 'relative',
					marginBottom: 0,
				}}
			>
				{images.map((img, index) => (
					<HeaderImage
						key={index}
						src={img}
						alt={`#IЧM ${index + 1}`}
						sx={{
							opacity: index === currentImageIndex ? 1 : 0,
							zIndex: index === currentImageIndex ? 1 : 0,
						}}
					/>
				))}
				{overlay && (
					<Overlay>
						<Container
							sx={{
								display: 'flex',
								alignItems: 'center',
								maxWidth: '1920px',
								width: '100%',
							}}
						>
							<ContentWrapper
								sx={{
									mt: {
										xxs: '-60px',
										sm: '-90px',
										md: '-120px',
										lg: '-150px',
										xl: '-190px',
									},
									ml: {
										xxs: '0',
										sm: '-16px',
										md: '-32px',
										lg: '-60px',
										xl: '-120px',
									},
									maxWidth: '1920px',
									width: '100%',
								}}
							>
								<Box sx={{ width: '100%' }}>
									{logoParts[0] && (
										<Typography
											component='div'
											sx={{
												fontSize: {
													xxs: '22px',
													sm: '28px',
													md: '34px',
													lg: '40px',
													xl: '48px',
												},
												fontWeight: 700,
												lineHeight: { xs: 1.2, md: 1.15, lg: 1.1 },
												color: '#fff',
												mb: 0,
												maxWidth: {
													xxs: '100%',
													md: '80%',
													lg: '70%',
													xl: '60%',
												},
												width: '100%',
												wordBreak: 'break-word',
												hyphens: 'auto',
												letterSpacing: { xs: 0, sm: '0.2px' },
											}}
										>
											{logoParts[0]}
										</Typography>
									)}
									{logoParts[1] && (
										<Typography
											component='div'
											sx={{
												fontSize: {
													xxs: '22px',
													sm: '28px',
													md: '34px',
													lg: '40px',
													xl: '48px',
												},
												fontWeight: 700,
												lineHeight: { xxs: 1.2, md: 1.15, lg: 1.1 },
												color: '#fff',
												mb: 0,
												maxWidth: {
													xxs: '100%',
													md: '80%',
													lg: '70%',
													xl: '60%',
												},
												wordBreak: 'break-word',
												hyphens: 'auto',
												letterSpacing: { xxs: 0, sm: '0.2px' },
											}}
										>
											{logoParts[1]}
										</Typography>
									)}
								</Box>
								{logoParts[2] && (
									<Typography
										component='div'
										sx={{
											fontSize: {
												xxs: '16px',
												sm: '20px',
												md: '24px',
												lg: '30px',
												xl: '36px',
											},
											fontWeight: 600,
											lineHeight: { xxs: 1.2, md: 1.15 },
											color: '#fff',
											mt: 0,
										}}
									>
										{logoParts[2]}
									</Typography>
								)}
							</ContentWrapper>
						</Container>
					</Overlay>
				)}
			</HeaderContainer>

			<Modal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Зворотний зв'язок"
			>
				<FeedbackForm onClose={() => setIsModalOpen(false)} />
			</Modal>
		</>
	)
}
