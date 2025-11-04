import { Box, Typography } from '@mui/material'
import { ImageSlider } from '@/components'

interface SimpleNewsContentProps {
  images: string[]
  title: string
  text: string
}

const SimpleNewsContent = ({ images, title, text }: SimpleNewsContentProps) => {
  return (
    <>
      {images.length > 0 && (
        <ImageSlider
          images={images}
          title={title}
          alt={title}
        />
      )}

      <Typography
        variant='body1'
        sx={{
          fontSize: '1.1rem',
          lineHeight: 1.7,
          color: '#333',
          mb: 3,
        }}
      >
        {text}
      </Typography>
    </>
  )
}

export default SimpleNewsContent 