import { Box } from '@mui/material'
import { PersonPhoto } from './Photo'
import { ContactList } from './Contacts'

interface ContactData {
	phone?: string
	email?: string
	googleScholar?: string
	orcid?: string
	scopus?: string
	researcherId?: string
	encyclopedia?: string
}

interface PersonSidebarProps {
	photo?: string
	contacts?: ContactData | Array<{ type: string; value: string }>
	contactsLabel?: string
}

export const PersonSidebar = ({ photo, contacts, contactsLabel }: PersonSidebarProps) => {
	return (
		<Box
			sx={{
				width: '400px',
				backgroundColor: '#2D7A84',
				padding: '30px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				'@media (max-width: 1024px)': {
					width: '100%',
					padding: '20px',
				},
			}}
		>
			<PersonPhoto photo={photo} />
			<ContactList contacts={contacts} contactsLabel={contactsLabel || ''} />
		</Box>
	)
} 