import { Box, Link as MUILink } from '@mui/material'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'

const SocialLinks = () => {
	const iconsStyle = {
		width: '28px',
		height: '28px',
		color: '#E4E4E4',
		transition: 'color 0.3s ease',
		'&:hover': {
			color: '#2D7A84',
		},
	}

	return (
		<Box sx={{ display: 'flex', gap: '10px', height: '28px' }}>
			<MUILink href='' target='_blank' rel='noopener noreferrer'>
				<FacebookRoundedIcon sx={iconsStyle} />
			</MUILink>
			<MUILink href='' target='_blank' rel='noopener noreferrer'>
				<InstagramIcon sx={iconsStyle} />
			</MUILink>
			<MUILink href='' target='_blank' rel='noopener noreferrer'>
				<YouTubeIcon sx={iconsStyle} />
			</MUILink>
		</Box>
	)
}

export default SocialLinks
