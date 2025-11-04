import { Typography } from '@mui/material'

interface MainTextProps {
  children: React.ReactNode
}

const MainText = ({ children }: MainTextProps) => {
  return (
    <Typography
      sx={{
        fontSize: '1.2rem',
        lineHeight: 1.7,
        color: '#333',
        mb: '30px',
      }}
    >
      {children}
    </Typography>
  )
}

export default MainText 