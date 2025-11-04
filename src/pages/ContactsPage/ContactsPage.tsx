import { Box, Grid } from '@mui/material'
import { DocumentTitleSearch } from '@/components'
import { useTranslationData } from '@/hooks/useTranslationData'
import { ContactInfo, ContactMap } from './components'

interface ContactsData {
	title: string
	instituteName: string
	phone: string
	phoneNumber: string
	email: string
	emailAddress: string
	address: string
	fullAddress: string
	feedbackTitle: string
	contactInfoTitle: string
}

const ContactsPage = () => {
	const { data } = useTranslationData<ContactsData>('contacts')

	if (!data) {
		return null
	}

	return (
		<Box
			sx={{
				pb: '30px',
				pl: { xs: '20px', md: '50px' },
				pr: { xs: '20px', sm: '50px' },
			}}
		>
			<DocumentTitleSearch title={`${data.title}`} search={false} />

			<Box sx={{ maxWidth: '1400px', mt: 4, mx: 'auto' }}>
				<Grid container spacing={4}>
					<Grid item>
						<ContactInfo data={data} />
					</Grid>

					<Grid
						item
						xs={12}
						lg={6}
						sx={{
							width: { xxs: '100%' },
						}}
					>
						<ContactMap />
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}

export default ContactsPage
