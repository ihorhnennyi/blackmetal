import { Box, Typography } from '@mui/material'
import TargetIcon from '@mui/icons-material/GpsFixed'

interface SectionHeaderProps {
  title: string
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <TargetIcon sx={{ color: '#2D7A84', fontSize: '1.8rem' }} />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: '#2D7A84',
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default SectionHeader 