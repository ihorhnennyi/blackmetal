import { Box, Typography } from '@mui/material'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { EquipmentCenterContactProps } from '../types'

const EquipmentCenterContact = ({
  contactTitle,
  contactName,
  contactPhone,
  contactEmail
}: EquipmentCenterContactProps) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: '18px',
          color: '#666',
          textAlign: 'justify',
          lineHeight: 1.6,
          mt: 4,
          mb: 2,
        }}
      >
        <strong>{contactTitle}</strong> {contactName}
      </Typography>
      
      <Box
        sx={{
          maxWidth: '600px',
          width: '100%',
          mx: 'auto',
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
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <PhoneOutlinedIcon sx={{ color: '#2D7A84' }} />
          <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>
            {contactPhone}
          </Typography>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <EmailOutlinedIcon sx={{ color: '#2D7A84' }} />
          <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>
            {contactEmail}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default EquipmentCenterContact 