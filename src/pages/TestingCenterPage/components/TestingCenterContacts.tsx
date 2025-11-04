import { Box, Typography, Link } from '@mui/material'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { DocumentCard } from '@/components'
import { DocumentCardProps } from '@/components/DocumentCard/DocumentCardInterface'
import { DocumentCardAdaptation } from '@/components/DocumentCard/styles'

interface ContactItem {
	type: string
	value: string
}
interface TestingCenterContactsProps {
	deputy: string
	deputyName: string
	contacts: ContactItem[]
	documents: DocumentCardProps[]
}

const TestingCenterContacts = ({
	deputy,
	deputyName,
	contacts,
	documents,
}: TestingCenterContactsProps) => {
	const textStyle = {
		fontSize: '18px',
		fontWeight: 600,
		color: '#333',
	}

	const linkStyle = {
		display: 'block',
		mb: '8px',
		color: '#2D7A84',
		fontWeight: 600,
		textDecoration: 'none',
		fontSize: '18px',
		'&:hover': {
			textDecoration: 'underline',
		},
	}

	return (
		<Box sx={{ textAlign: 'left' }}>
			<Typography sx={textStyle}>{deputy}</Typography>
			<Typography sx={{ ...textStyle, mb: 1 }}>{deputyName}</Typography>

			<Box
				sx={{
					maxWidth: '805px',
					width: '100%',
					m: '28px auto',
					py: '10px',
					px: '20px',
					display: 'flex',
					justifyContent: 'space-around',
					flexWrap: 'wrap',
					rowGap: '10px',
					columnGap: '30px',
					border: '1px solid #DFDFDFDF',
					'@media (max-width: 480px)': {
						flexDirection: 'column',
						alignItems: 'center',
					},
				}}
			>
				{contacts.map((contact, index) => (
					<Box
						key={index}
						sx={{
							display: 'flex',
							gap: '8px',
							alignItems: 'center',
						}}
					>
						{contact.type === 'Phone' || contact.type === 'Телефон' ? (
							<PhoneOutlinedIcon sx={{ color: '#2D7A84' }} />
						) : (
							<EmailOutlinedIcon sx={{ color: '#2D7A84' }} />
						)}
						<Typography sx={{ fontSize: '15px', fontWeight: 600 }}>
							{contact.value}
						</Typography>
					</Box>
				))}
			</Box>

			<Box sx={{ maxWidth: '1220px', mt: '28px', mx: 'auto' }}>
				<Box sx={DocumentCardAdaptation}>
					{documents.map((item, idx) => (
						<DocumentCard
							key={idx}
							title={item.title}
							link={item.link}
							date={item.date}
						/>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default TestingCenterContacts
