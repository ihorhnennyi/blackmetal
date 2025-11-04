import { Typography } from '@mui/material'

interface PersonInfoProps {
	position?: string
	name?: string
	description?: string
}

export const PersonInfo = ({ position, name, description }: PersonInfoProps) => {
	return (
		<>
			{position && (
				<Typography
					sx={{
						fontSize: '18px',
						fontWeight: 500,
						color: '#555',
						marginBottom: '25px',
						lineHeight: 1.4,
					}}
				>
					{position}
				</Typography>
			)}

			{name && (
				<Typography
					sx={{
						fontSize: '28px',
						fontWeight: 700,
						color: '#1a1a1a',
						marginBottom: '20px',
						lineHeight: 1.2,
						'@media (max-width: 768px)': {
							fontSize: '24px',
						},
					}}
				>
					{name}
				</Typography>
			)}

			{description && (
				<Typography
					sx={{
						fontSize: '18px',
						fontWeight: 500,
						color: '#555',
						marginBottom: '25px',
						lineHeight: 1.4,
					}}
				>
					{description}
				</Typography>
			)}
		</>
	)
} 