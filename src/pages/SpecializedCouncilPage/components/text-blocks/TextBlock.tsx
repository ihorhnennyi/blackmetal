import { Typography } from '@mui/material'

interface TextBlockProps {
  content: string
  variant?: 'text' | 'small' | 'sectionTitle'
}

export const TextBlock = ({ content, variant = 'text' }: TextBlockProps) => {
  const styles = {
    text: {
      mb: '14px',
      fontSize: '16px',
      fontWeight: 400,
    },
    small: {
      mb: '20px',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.8,
      color: '#666666',
    },
    sectionTitle: {
      mt: '48px',
      mb: '16px',
      fontSize: '18px',
      fontWeight: 600,
    },
  }

  return (
    <Typography sx={styles[variant]}>
      {content}
    </Typography>
  )
} 