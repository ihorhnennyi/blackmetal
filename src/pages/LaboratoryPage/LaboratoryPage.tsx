import { PersonInfoLayout } from '@/components'
import { PersonCardInterface } from '@/components/PersonCard/PersonCardInterface'
import { useTranslationData } from '@/hooks/useTranslationData'
import { useLocation } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

interface LaboratoryData {
  title: string
  staffCards: PersonCardInterface[]
  firstPersonCard?: PersonCardInterface
}

const LaboratoryPage = () => {
  const location = useLocation()
  
  const pathSegments = location.pathname.split('/')
  const labPath = pathSegments[pathSegments.length - 1] 
  
  const labIdentifier = labPath?.replace('lab-', '') 
  
  const { data} = useTranslationData<LaboratoryData>(labIdentifier || '')

  if (!data || !labIdentifier) {
    return (
      <Box sx={{ pl: { xxs: '0px', sm: '50px' }, pt: 4 }}>
        <Typography variant="h6" color="error">
          Лабораторію не знайдено. ID: {labIdentifier}
        </Typography>
      </Box>
    )
  }

  return (
    <PersonInfoLayout
      title={data.title}
      staffCards={data.staffCards}
      firstPersonCard={data.firstPersonCard}
      searchEnabled={false}
    />
  )
}

export default LaboratoryPage