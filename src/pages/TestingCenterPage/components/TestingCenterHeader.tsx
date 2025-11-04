import { Box, Typography } from '@mui/material'

interface TestingCenterHeaderProps {
  subtitle: string
  institute: string
}

const TestingCenterHeader = ({ subtitle, institute }: TestingCenterHeaderProps) => {
  return (
    <>
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          mb: '16px', 
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        {subtitle}
      </Typography>
      
      <Typography 
        variant="h5" 
        sx={{ 
          textAlign: 'center', 
          mb: '32px', 
          fontSize: { xs: '1.2rem', md: '1.5rem' }
        }}
      >
        {institute}
      </Typography>
    </>
  )
}

export default TestingCenterHeader 