import { Box, Typography } from '@mui/material'

interface SimpleServiceItemProps {
  service: string
}

export const SimpleServiceItem = ({ service }: SimpleServiceItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 1,
        backgroundColor: 'rgba(45, 122, 132, 0.02)',
        border: '1px solid rgba(45, 122, 132, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(45, 122, 132, 0.05)',
          borderColor: 'rgba(45, 122, 132, 0.2)',
          transform: 'translateX(4px)'
        }
      }}
    >
      <Typography
        sx={{
          fontSize: '18px',
          lineHeight: 1.6,
          color: '#333',
          textAlign: 'justify',
          flex: 1
        }}
      >
        {service}
      </Typography>
    </Box>
  )
} 