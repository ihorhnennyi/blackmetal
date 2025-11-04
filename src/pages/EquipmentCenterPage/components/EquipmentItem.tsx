import { Box, Typography } from '@mui/material'
import CustomTable from '@/components/CustomTable'
import { TableDataItem, EquipmentItemProps } from '../types'

const EquipmentItem = ({
  title,
  imageSrc,
  imageAlt,
  equipmentDescriptionTitle,
  equipmentDescription,
  applicationAreaTitle,
  applicationArea,
  technicalCharacteristicsTitle,
  tableData,
  methods,
  additionalInfo
}: EquipmentItemProps) => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontSize: '18px',
          fontWeight: 800,
          color: '#333',
          mt: 6,
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Box
          component="img"
          src={imageSrc}
          alt={imageAlt}
          sx={{
            maxWidth: '100%',
            height: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto', xl: '800px' },
            objectFit: 'contain'
          }}
        />
      </Box>
      
      <Typography
        variant="h6"
        sx={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#333',
          textAlign: 'center',
          mt: 4,
        }}
      >
        {equipmentDescriptionTitle}
      </Typography>
      
      <Typography
        sx={{
          fontSize: '18px',
          color: '#666',
          textAlign: 'justify',
          lineHeight: 1.6,
          mt: 2,
        }}
      >
        {equipmentDescription}
      </Typography>
      
      <Typography
        variant="h6"
        sx={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#333',
          textAlign: 'center',
          mt: 2,
        }}
      >
        {applicationAreaTitle}
      </Typography>
      
      <Typography
        sx={{
          fontSize: '18px',
          color: '#666',
          textAlign: 'justify',
          lineHeight: 1.6,
          mt: 2,
        }}
      >
        {applicationArea}
      </Typography>
      
      {methods && methods.length > 0 && (
        <Box
          component="ul"
          sx={{
            mt: 2,
            pl: 3,
            fontSize: '18px',
            color: '#666',
            lineHeight: 1.6,
          }}
        >
          {methods.map((method, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>
              {method}
            </li>
          ))}
        </Box>
      )}
      
      {technicalCharacteristicsTitle && (
        <Typography
          variant="h6"
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#333',
            textAlign: 'center',
            mt: 2,
          }}
        >
          {technicalCharacteristicsTitle}
        </Typography>
      )}
      
      {tableData && (
        <CustomTable
          tableData={tableData}
          headerStyle={{
            backgroundColor: '#2D7A84',
            color: 'white',
            fontWeight: 600,
            fontSize: '18px',
            textAlign: 'center',
            textAlignLast: 'center',
          }}
          cellStyle={{
            fontSize: '18px',
            padding: '12px',
            verticalAlign: 'top',
            lineHeight: 1.5,
          }}
          containerStyle={{
            mt: 2,
            mb: 2,
            width: '100%',
            mx: 'auto',
            overflowX: 'auto',
          }}
        />
      )}
      
      {additionalInfo?.technicalCharacteristics && (
        <Typography
          sx={{
            fontSize: '18px',
            color: '#666',
            textAlign: 'justify',
            lineHeight: 1.6,
            mt: 2,
          }}
        >
          {additionalInfo.technicalCharacteristics}
        </Typography>
      )}
      
      {additionalInfo?.magnification && (
        <Typography
          sx={{
            fontSize: '18px',
            color: '#666',
            textAlign: 'justify',
            lineHeight: 1.6,
            mt: 2,
          }}
        >
          {additionalInfo.magnification}
        </Typography>
      )}
      
      {additionalInfo?.motorizedFunctions && (
        <Typography
          sx={{
            fontSize: '18px',
            color: '#666',
            textAlign: 'justify',
            lineHeight: 1.6,
            mt: 2,
          }}
        >
          {additionalInfo.motorizedFunctions}
        </Typography>
      )}
      
      {additionalInfo?.software && (
        <Typography
          sx={{
            fontSize: '18px',
            color: '#666',
            textAlign: 'justify',
            lineHeight: 1.6,
            mt: 2,
          }}
        >
          {additionalInfo.software}
        </Typography>
      )}
      
      {additionalInfo?.operations && additionalInfo.operations.length > 0 && (
        <Box
          component="ul"
          sx={{
            mt: 2,
            pl: 3,
            fontSize: '18px',
            color: '#666',
            lineHeight: 1.6,
          }}
        >
          {additionalInfo.operations.map((operation, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>
              {operation}
            </li>
          ))}
        </Box>
      )}
      
      {additionalInfo?.analysis && (
        <Typography
          sx={{
            fontSize: '18px',
            color: '#666',
            textAlign: 'justify',
            lineHeight: 1.6,
            mt: 2,
          }}
        >
          {additionalInfo.analysis}
        </Typography>
      )}
      
      {additionalInfo?.stage && (
        <Typography
          sx={{
            fontSize: '18px',
            color: '#666',
            textAlign: 'justify',
            lineHeight: 1.6,
            mt: 2,
          }}
        >
          {additionalInfo.stage}
        </Typography>
      )}
    </>
  )
}

export default EquipmentItem 