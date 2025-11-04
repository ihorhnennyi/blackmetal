import { Box, Typography } from '@mui/material'
import { DocumentTitleSearch } from '@/components'

interface NewsHeaderProps {
	title: string
	date: string
}

const NewsHeader = ({ title, date }: NewsHeaderProps) => {
	return (
		<Box
			sx={theme => ({
				display: 'flex',
				flexDirection: { xxs: 'column' },
				alignItems: { xxs: 'center', lg: 'center' },
				justifyContent: { lg: 'space-between' },

				mb: 3,
				[theme.breakpoints.down(480)]: {
					alignItems: 'center',
					'& .MuiTypography-h4, & .MuiTypography-caption': {
						width: '100%',
					},
				},
			})}
		>
			<DocumentTitleSearch title={title} search={false} />
			<Typography
				variant='caption'
				sx={{
					color: 'text.secondary',
					fontSize: { xxs: '0.95rem', sm: '1rem', lg: '0.9rem' },
					whiteSpace: 'normal',
					flexShrink: 0,
					textAlign: { xxs: 'center', sm: 'center', lg: 'left' },
					display: 'block',
					ml: { xxs: 0, lg: 2 },
					mt: { xxs: 0, lg: 0 },
					maxWidth: '100%',
					width: { xxs: '100%', lg: 'auto' },
					wordBreak: 'break-word',
				}}
			>
				{date}
			</Typography>
		</Box>
	)
}

export default NewsHeader
