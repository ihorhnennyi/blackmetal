import { Box, Typography } from '@mui/material'

interface TestingCenterContentProps {
  description: string
  tests: string[]
  certification: string
}

const TestingCenterContent = ({ description, tests, certification }: TestingCenterContentProps) => {
  return (
    <>
      <Typography 
        sx={{ 
          mb: '24px', 
          fontSize: '18px', 
          lineHeight: 1.6,
          color: '#333'
        }}
      >
        {description}
      </Typography>

      <Box component="ul" sx={{ pl: 3, mb: 3 }}>
        {tests.map((test, index) => (
          <Typography 
            key={index}
            component="li" 
            sx={{ 
              mb: '8px', 
              fontSize: '18px', 
              lineHeight: 1.6,
              color: '#333'
            }}
          >
            {test}
          </Typography>
        ))}
      </Box>

      <Typography 
        sx={{ 
          mb: '32px', 
          fontSize: '18px', 
          lineHeight: 1.6,
          color: '#333'
        }}
      >
        {certification}
      </Typography>
    </>
  )
}

export default TestingCenterContent 