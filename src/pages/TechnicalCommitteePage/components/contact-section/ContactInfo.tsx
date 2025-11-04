import { Box, Typography } from '@mui/material'

interface ContactData {
  title: string
  name: string
  position: string
  phone: string
  email: string
}

interface ContactInfoProps {
  contact: ContactData
}

export const ContactInfo = ({ contact }: ContactInfoProps) => {
  const contactStyle = {
    fontSize: '18px',
    color: '#333',
    lineHeight: 1.5,
    mt: '30px'
  }

  return (
    <Box sx={contactStyle}>
      <Typography sx={{ fontSize: '18px', fontWeight: 600, mb: '5px' }}>
        {contact.title}
      </Typography>
      <Typography sx={{ fontSize: '18px', mb: '5px' }}>
        {contact.name}
      </Typography>
      <Typography sx={{ fontSize: '18px', mb: '5px' }}>
        {contact.position}
      </Typography>
      <Typography sx={{ fontSize: '18px', mb: '5px' }}>
        {contact.phone}
      </Typography>
      <Typography sx={{ fontSize: '18px' }}>
        {contact.email}
      </Typography>
    </Box>
  )
} 