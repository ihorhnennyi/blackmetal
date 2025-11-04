import { Box, Typography } from '@mui/material'

interface LaboratoryTestsSectionProps {
  laboratoryTests?: {
    title: string
    items: string[]
  }
}

const LaboratoryTestsSection = ({ laboratoryTests }: LaboratoryTestsSectionProps) => {
  if (!laboratoryTests || !laboratoryTests.items || laboratoryTests.items.length === 0) {
    return null
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: 1.4,
            color: '#333333',
            textAlign: 'center',
          }}
        >
          {laboratoryTests.title}
        </Typography>
      </Box>
      <Box
        component='ul'
        sx={{
          pl: 2,
          '& li': {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#333333',
            mb: 1,
          },
        }}
      >
        {laboratoryTests.items.map((item, index) => (
          <Typography component='li' key={index}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

export default LaboratoryTestsSection 