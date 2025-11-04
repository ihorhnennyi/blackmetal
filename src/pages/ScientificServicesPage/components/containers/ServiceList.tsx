import { Box } from '@mui/material'
import { ServiceItem, SimpleServiceItem } from '../elements'

interface ServiceListProps {
  services: string[]
  numbered?: boolean
}

export const ServiceList = ({ services, numbered = false }: ServiceListProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
      {services.map((service, index) => (
        numbered ? (
          <ServiceItem key={index} service={service} index={index} />
        ) : (
          <SimpleServiceItem key={index} service={service} />
        )
      ))}
    </Box>
  )
} 