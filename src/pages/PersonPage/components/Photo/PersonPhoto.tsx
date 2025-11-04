import { Box } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

interface PersonPhotoProps {
	photo?: string
}

export const PersonPhoto = ({ photo }: PersonPhotoProps) => {
	return (
		<Box
			sx={{
				width: '100%',
				aspectRatio: '0.75 / 1',
				overflow: 'hidden',
				backgroundColor: '#2D7A84',
				backgroundImage: photo ? `url(${photo})` : 'none',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: '30px',
			}}
		>
			{!photo && (
				<PersonIcon
					sx={{
						fontSize: '120px',
						color: 'white',
					}}
				/>
			)}
		</Box>
	)
}
