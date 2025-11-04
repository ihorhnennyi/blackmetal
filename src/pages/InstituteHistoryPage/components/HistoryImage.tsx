import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'

interface HistoryImageProps {
  src: string
  alt: string
  caption: string
}

const HistoryImage = ({ src, alt, caption }: HistoryImageProps) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isLargeScreen = useMediaQuery('(min-width: 1648px)')

  const imageStyle = {
    width: '100%',
    height: isDesktop && isLargeScreen ? '800px' : 'auto',
    objectFit: 'contain' as const
  }

  const captionStyle = {
    fontSize: '16px',
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center' as const,
    mt: '16px',
    lineHeight: 1.4,
    whiteSpace: 'pre-line' as const
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: '32px' }}>
      <Box sx={{ width: '100%' }}>
        <img src={src} alt={alt} style={imageStyle} />
        <Typography sx={captionStyle}>{caption}</Typography>
      </Box>
    </Box>
  )
}

export default HistoryImage 