import { Box, Typography, Link } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ContactIcon } from './ContactIcon'
import { isUrl, getContactDisplayValue } from './ContactUtils'

interface ContactData {
	phone?: string
	email?: string
	googleScholar?: string
	orcid?: string
	scopus?: string
	researcherId?: string
	encyclopedia?: string
}

interface ContactListProps {
	contacts?: ContactData | Array<{ type: string; value: string }>
	contactsLabel: string
}

export const ContactList = ({ contacts, contactsLabel }: ContactListProps) => {
	const { t } = useTranslation()

	if (!contacts) {
		return null
	}

	let contactItems: Array<{ type: string; value: string }> = []

	if (Array.isArray(contacts)) {
		contactItems = contacts.filter(item => item.value && typeof item.value === 'string' && item.value.trim() !== '')
	} else {
		contactItems = Object.entries(contacts)
			.map(([key, value]) => ({
				type: key,
				value: value as string
			}))
			.filter(item => item.value && typeof item.value === 'string' && item.value.trim() !== '')
	}

	if (contactItems.length === 0) {
		return null
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Typography
				sx={{
					fontSize: '18px',
					fontWeight: 600,
					color: 'white',
					marginBottom: '15px',
					textAlign: 'center',
				}}
			>
				{contactsLabel}
			</Typography>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				{contactItems.map((contact, index) => (
					<Box
						key={index}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '15px',
						}}
					>
						<Box
							sx={{
								width: '35px',
								height: '35px',
								backgroundColor: 'white',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ContactIcon contactType={contact.type} />
						</Box>
						<Typography
							sx={{ fontSize: '16px', fontWeight: 600, color: 'white' }}
						>
							{isUrl(contact.value) ? (
								<Link
									href={contact.value}
									target='_blank'
									rel='noopener noreferrer'
									sx={{
										color: 'white',
										textDecoration: 'none',
										'&:hover': {
											color: '#f0f0f0',
										},
									}}
								>
									{getContactDisplayValue(contact.type, t) || contact.value}
								</Link>
							) : (
								contact.value
							)}
						</Typography>
					</Box>
				))}
			</Box>
		</Box>
	)
} 