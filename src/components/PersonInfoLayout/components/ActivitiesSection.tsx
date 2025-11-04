import { Box, Typography } from '@mui/material'

interface ActivitiesSectionProps {
  activities?: {
    items: string[]
  }
  activitiesTitle?: string
}

const ActivitiesSection = ({ activities, activitiesTitle }: ActivitiesSectionProps) => {
  if (!activities || !activities.items || activities.items.length === 0) {
    return null
  }

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: 1.4,
            color: '#333333',
            textAlign: 'center',
          }}
        >
          {activitiesTitle || 'Main activity directions:'}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box
          component='ol'
          sx={{
            pl: 2,
            '& li': {
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.6,
              color: '#333333',
              mb: 1,
            },
            '& li.sub-item': {
              listStyleType: 'none',
              ml: 3,
              position: 'relative',
              '&::before': {
                content: '"• "',
                position: 'absolute',
                left: '-15px',
              },
            },
          }}
        >
          {activities.items.map((item, index) => {
            const isSubItem =
              item.length > 0 &&
              item[0] === item[0].toLowerCase() &&
              /[а-яё]/.test(item[0])

            return (
              <Typography
                component='li'
                key={index}
                className={isSubItem ? 'sub-item' : ''}
              >
                {item}
              </Typography>
            )
          })}
        </Box>
      </Box>
    </>
  )
}

export default ActivitiesSection 