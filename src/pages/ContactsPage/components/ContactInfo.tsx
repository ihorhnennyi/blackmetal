import { Box, Typography, Link, Card, CardContent } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'

interface ContactInfoProps {
  data: {
    contactInfoTitle: string
    phone: string
    phoneNumber: string
    email: string
    emailAddress: string
    address: string
    fullAddress: string
  }
}

const cardStyles = {
  borderRadius: 0,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
}

const iconContainerStyles = {
  minWidth: 50,
  minHeight: 50,
  borderRadius: '50%',
  backgroundColor: 'rgba(45, 122, 132, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
}

const iconStyles = {
  color: '#2D7A84',
  fontSize: '1.5rem'
}

const labelStyles = {
  fontSize: '0.9rem',
  color: '#666',
  fontWeight: 500,
  mb: 0.5
}

const linkStyles = {
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#333',
  textDecoration: 'none',
}

const addressTextStyles = {
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#333',
  lineHeight: 1.4,
  cursor: 'pointer',
  transition: 'color 0.3s ease'
}

interface ContactCardProps {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}

const ContactCard = ({ icon, label, children }: ContactCardProps) => (
  <Card sx={cardStyles}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={iconContainerStyles}>
          {icon}
        </Box>
        <Box>
          <Typography sx={labelStyles}>
            {label}
          </Typography>
          {children}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

const ContactInfo = ({ data }: ContactInfoProps) => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: '#2D7A84',
          mb: 3
        }}
      >
        {data.contactInfoTitle}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ContactCard 
          icon={<PhoneIcon sx={iconStyles} />}
          label={data.phone}
        >
          <Link
            href={`tel:${data.phoneNumber.replace(/\s/g, '')}`}
            sx={linkStyles}
          >
            {data.phoneNumber}
          </Link>
        </ContactCard>

        <ContactCard 
          icon={<EmailIcon sx={iconStyles} />}
          label={data.email}
        >
          <Link
            href={`mailto:${data.emailAddress}`}
            sx={{ ...linkStyles, wordBreak: 'break-all' }}
          >
            {data.emailAddress}
          </Link>
        </ContactCard>

        <ContactCard 
          icon={<LocationOnIcon sx={iconStyles} />}
          label={data.address}
        >
          <Typography sx={addressTextStyles}>
            {data.fullAddress}
          </Typography>
        </ContactCard>
      </Box>
    </>
  )
}

export default ContactInfo 