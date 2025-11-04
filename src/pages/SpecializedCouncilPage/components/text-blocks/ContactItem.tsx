import { Box, Typography } from '@mui/material'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

interface ContactItemProps {
  type: string
  value: string
}

export const ContactItem = ({ type, value }: ContactItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      {type === 'Phone' || type === 'Телефон' ? (
        <PhoneOutlinedIcon sx={{ color: '#2D7A84' }} />
      ) : (
        <EmailOutlinedIcon sx={{ color: '#2D7A84' }} />
      )}
      <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  )
} 