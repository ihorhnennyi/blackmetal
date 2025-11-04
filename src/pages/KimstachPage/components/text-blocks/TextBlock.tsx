import { Typography } from '@mui/material'

interface TextBlockProps {
  content: string
  variant?: 'text' | 'small'
}

export const TextBlock = ({ content, variant = 'text' }: TextBlockProps) => {
  const styles = {
    text: {
      mb: '14px',
      fontSize: '16px',
      fontWeight: 400
    },
    small: {
      mb: '14px',
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.8,
      color: '#666666'
    }
  }

  return (
    <Typography sx={styles[variant]}>
      {content}
    </Typography>
  )
} 