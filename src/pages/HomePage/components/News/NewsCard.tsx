import { FC } from 'react'
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
	Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { NewsItem } from './NewsTypes'
import { useTranslation } from 'react-i18next'
import { Theme } from '@mui/material/styles' 

type NewsCardProps = NewsItem

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
	display: 'flex',
	height: '250px',
	width: '100%',
	boxShadow: '0 4px 20px rgba(20, 41, 52, 0.08)',
	borderRadius: 0,
	[theme.breakpoints.down('sm')]: {
		height: 'auto',
		minHeight: '250px',
		flexDirection: 'column',
	},
}))

const StyledCardMedia = styled(CardMedia)({
	width: '250px',
	height: '250px',
	flexShrink: 0,
	backgroundColor: '#fff',
	borderRadius: 0,
	backgroundSize: 'contain',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	'@media (max-width: 600px)': {
		width: '100%',
		height: '250px',
		margin: 0,
		borderRadius: 0,
	},
})

const ContentBox = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	height: '100%',
})

const TextContent = styled(Box)({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	overflow: 'hidden',
})

const ActionBox = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginTop: 'auto',
	paddingTop: '6px',
	'@media (max-width: 600px)': {
		paddingTop: '6px',
	},
})

const StyledButton = styled(Button)(({ theme }: { theme: Theme }) => ({
	padding: '7px 20px',
	fontSize: '0.875rem',
	fontWeight: 500,
	textTransform: 'none',
	borderColor: theme.palette.primary.main,
	color: theme.palette.primary.main,
	borderRadius: 0,
	'&:hover': {
		borderColor: theme.palette.primary.dark,
		backgroundColor: 'rgba(20, 41, 52, 0.04)',
	},
}))

export const NewsCard: FC<NewsCardProps> = ({
	title,
	text,
	imageUrl,
	date,
	onClick,
}) => {
	const { t } = useTranslation()

	return (
		<StyledCard>
			<StyledCardMedia image={imageUrl} title={title} />
			<CardContent
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					p: { xs: 2, sm: 2.5, md: 2 },
					'&:last-child': { pb: { xs: 2, sm: 2.5, md: 2 } },
				}}
			>
				<ContentBox>
					<TextContent>
						<Typography
							variant='h6'
							component='h2'
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
								fontWeight: 800,
								fontSize: { xs: '1.1rem', sm: '1.35rem' },
								lineHeight: 1.3,
								color: '#142934',
								mb: 0.5,
							}}
						>
							{title}
						</Typography>
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{
								fontSize: { xs: '0.92rem', sm: '1rem' },
								lineHeight: 1.5,
								opacity: 0.85,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
								mb: 0.5,
							}}
						>
							{text}
						</Typography>
					</TextContent>
					<ActionBox>
						<StyledButton
							variant='outlined'
							onClick={onClick}
							sx={(theme: Theme) => ({
								minWidth: '110px',
								fontSize: '0.92rem',
								py: 0.5,
								px: 2,
								mb: 1.2,
								'&:hover': {
									backgroundColor: theme.palette.primary.main,
									color: '#fff',
								},
							})}
						>
							{t('buttonNews.go')}
						</StyledButton>
						<Typography
							variant='caption'
							sx={{
								color: 'text.secondary',
								fontSize: '0.95rem',
								opacity: 0.75,
								ml: 2,
							}}
						>
							{date}
						</Typography>
					</ActionBox>
				</ContentBox>
			</CardContent>
		</StyledCard>
	)
}