import { Box, Button, Link as MUILink } from '@mui/material'
import { DocumentTitleSearch } from '@/components'
import { EquipmentCenterHeaderProps } from '../types'

const EquipmentCenterHeader = ({
	title,
	viewRegulation,
	viewRegulation2,
	viewRegulation3,
	onViewRegulation,
}: EquipmentCenterHeaderProps) => {
	return (
		<>
			<DocumentTitleSearch title={title} search={false} />

			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
				<Box
					component='img'
					src='/SREC_img1.png'
					alt={title}
					sx={{
						maxWidth: '100%',
						height: {
							xs: 'auto',
							sm: 'auto',
							md: 'auto',
							lg: 'auto',
							xl: '800px',
						},
						objectFit: 'contain',
					}}
				/>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '20px',
					mt: 3,
				}}
			>
				<MUILink
					href={'/Положення_про_ЦККП_нова_редакція.pdf'}
					rel='noopener noreferrer'
					sx={{ minWidth: '250px' }}
				>
					<Button
						variant='contained'
						// onClick={onViewRegulation}
						sx={{
							backgroundColor: '#2D7A84',
							color: '#fff',
							borderRadius: 0,
							padding: '12px 32px',
							fontSize: '18px',
							textTransform: 'none',
							fontWeight: 500,
							minWidth: '250px',
							whiteSpace: 'nowrap',
							'&:hover': { backgroundColor: '#1f5a60' },
						}}
					>
						{viewRegulation}
					</Button>
				</MUILink>

				<MUILink
					href={'/Перелік обладнання.pdf'}
					rel='noopener noreferrer'
					sx={{ minWidth: '250px' }}
				>
					<Button
						variant='contained'
						// onClick={onViewRegulation}
						sx={{
							backgroundColor: '#2D7A84',
							color: '#fff',
							borderRadius: 0,
							padding: '12px 32px',
							fontSize: '18px',
							textTransform: 'none',
							fontWeight: 500,
							minWidth: '250px',
							whiteSpace: 'nowrap',
							'&:hover': { backgroundColor: '#1f5a60' },
						}}
					>
						{viewRegulation2}
					</Button>
				</MUILink>
				<MUILink
					href={'/Регламент доступу.pdf'}
					rel='noopener noreferrer'
					sx={{ minWidth: '250px' }}
				>
					<Button
						variant='contained'
						// onClick={onViewRegulation}
						sx={{
							backgroundColor: '#2D7A84',
							color: '#fff',
							borderRadius: 0,
							padding: '12px 32px',
							fontSize: '18px',
							textTransform: 'none',
							fontWeight: 500,
							minWidth: '250px',
							whiteSpace: 'nowrap',
							'&:hover': { backgroundColor: '#1f5a60' },
						}}
					>
						{viewRegulation3}
					</Button>
				</MUILink>
			</Box>
		</>
	)
}

export default EquipmentCenterHeader
