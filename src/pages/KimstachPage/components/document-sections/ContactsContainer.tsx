import { Box } from '@mui/material'
import { ContactItem } from '../text-blocks'

interface ContactData {
  type: string
  value: string
}

interface ContactsContainerProps {
  contacts: ContactData[]
}

export const ContactsContainer = ({ contacts }: ContactsContainerProps) => {
  return (
    <Box
      sx={{
        maxWidth: '600px',
        width: '100%',
        m: '28px auto',
        py: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        border: '1px solid #DFDFDFDF',
        '@media (max-width: 480px)': {
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        },
      }}
    >
      {contacts.map((contact, index) => (
        <ContactItem key={index} type={contact.type} value={contact.value} />
      ))}
    </Box>
  )
} 