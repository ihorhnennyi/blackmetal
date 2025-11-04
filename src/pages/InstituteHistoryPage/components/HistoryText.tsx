import { Typography } from '@mui/material'

interface HistoryTextProps {
  children: React.ReactNode
}

const HistoryText = ({ children }: HistoryTextProps) => {
  const textStyle = {
    fontSize: '18px',
    color: '#333',
    mb: '24px',
    textAlign: 'justify' as const,
    lineHeight: 1.6
  }

  return (
    <Typography sx={textStyle}>
      {children}
    </Typography>
  )
}

export default HistoryText 