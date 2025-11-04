import { Typography } from '@mui/material'

interface TextBlockProps {
  content: string
  variant?: 'title' | 'text'
}

export const TextBlock = ({ content, variant = 'text' }: TextBlockProps) => {
  const styles = {
    title: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#2D7A84',
      mb: '16px'
    },
    text: {
      fontSize: '18px',
      color: '#333',
      mb: '24px',
      textAlign: 'justify' as const,
      lineHeight: 1.6
    }
  }

  return (
    <Typography sx={styles[variant]}>
      {content}
    </Typography>
  )
} 