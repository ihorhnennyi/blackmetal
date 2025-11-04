import { Box, Typography } from '@mui/material'

interface StrategyDirectionProps {
  text: string
  index: number
}

const StrategyDirection = ({ text, index }: StrategyDirectionProps) => {
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
      <Box
        sx={{
          minWidth: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: '#2D7A84',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.9rem',
          fontWeight: 600
        }}
      >
        {index + 1}
      </Box>
      <Typography
        sx={{
          fontSize: '1.2rem',
          lineHeight: 1.6,
          color: '#333',
          textAlign: 'justify',
          flex: 1
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}

export default StrategyDirection 