import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import { PersonCardInterface } from './PersonCardInterface'
import { CommonTextStyles, CommonButtonStyles } from '../../utils'
import { useTranslation } from 'react-i18next'

const PersonCard = ({
	id,
	photo,
	position,
	name,
	description = '',
	biography,
	researchDirection,
	teachingSubjects,
	contacts = {},
	labels,
}: PersonCardInterface) => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	const hasDetailedInfo = !!(
		biography ||
		researchDirection ||
		teachingSubjects ||
		description
	)

	const handleDetailsClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (hasDetailedInfo) {
			navigate(`/person/${id}`)
		}
	}

	let contactItems: Array<{ type: string; value: string }> = []

	if (Array.isArray(contacts)) {
		contactItems = contacts.filter(
			item =>
				item.value && typeof item.value === 'string' && item.value.trim() !== ''
		)
	} else if (contacts && typeof contacts === 'object') {
		contactItems = Object.entries(contacts)
			.map(([key, value]) => ({
				type: key,
				value: value as string,
			}))
			.filter(
				item =>
					item.value &&
					typeof item.value === 'string' &&
					item.value.trim() !== ''
			)
	}

	const displayContacts = contactItems.filter(contact => {
		const type = contact.type.toLowerCase()
		return (
			type.includes('email') ||
			type.includes('телефон') ||
			type.includes('phone') ||
			type.includes('мобільний')
		)
	})

	const contactsToShow = displayContacts.slice(0, 2)

	return (
		<Box
			sx={{
				maxWidth: '589px',
				textDecoration: 'none',
				color: '#000000',
				cursor: hasDetailedInfo ? 'pointer' : 'default',
				position: 'relative',
			}}
			onClick={() => {
				if (hasDetailedInfo) {
					navigate(`/person/${id}`)
				}
			}}
		>
			<Box
				sx={{
					width: '100%',
					m: '0 auto',
					maxWidth: '589px',
					display: 'flex',
					flexDirection: 'row',
					bgcolor: '#FFFFFF',
					'@media (max-width: 600px)': {
						flexDirection: 'column',
					},
				}}
			>
				<Box
					sx={{
						width: '43%',
						aspectRatio: '0.7505 / 1',
						bgcolor: '#FFFFFF',
						backgroundImage: photo ? `url(${photo})` : 'none',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						'@media (max-width: 600px)': {
							width: '100%',
							aspectRatio: '1 / 1',
							backgroundSize: 'contain',
						},
					}}
				>
					{!photo && (
						<PersonIcon
							sx={{
								fontSize: '120px',
								color: '#2D7A84',
							}}
						/>
					)}
				</Box>
				<Box
					sx={{
						width: '57%',
						px: '30px',
						pt: '30px',
						pr: '30px',
						pb: '55px',
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						alignItems: 'center',
						textAlign: 'center',
						'@media (max-width: 600px)': {
							width: '100%',
						},
					}}
				>
					{position && (
						<Typography
							sx={{
								...CommonTextStyles.position,
							}}
						>
							{position}
						</Typography>
					)}

					<Typography
						sx={{
							...CommonTextStyles.title,
							mt: '10px',
						}}
					>
						{name}
					</Typography>

					{contactsToShow.length > 0 && (
						<Box sx={{ mt: '10px' }}>
							{contactsToShow.map((contact, index) => (
								<Box
									key={index}
									sx={{
										mt: index === 0 ? '0px' : '10px',
										display: 'flex',
										gap: '10px',
										justifyContent: 'center',
									}}
								>
									{contact.type && (
										<Typography
											sx={{
												...CommonTextStyles.caption,
												color: '#8A8A8A',
											}}
										>
											{contact.type}:
										</Typography>
									)}
									<Typography sx={CommonTextStyles.caption}>
										{contact.value}
									</Typography>
								</Box>
							))}
						</Box>
					)}
				</Box>
			</Box>

			{hasDetailedInfo && (
				<Button
					variant='contained'
					onClick={handleDetailsClick}
					sx={{
						...CommonButtonStyles.primary,
						fontSize: '12px',
						fontWeight: 500,
						position: 'absolute',
						bottom: '15px',
						right: '15px',
						'@media (max-width: 600px)': {
							fontSize: '11px',
							padding: '5px 10px',
							bottom: '15px',
							right: '15px',
						},
					}}
				>
					{t('common.readMore')}
				</Button>
			)}
		</Box>
	)
}

export default PersonCard
