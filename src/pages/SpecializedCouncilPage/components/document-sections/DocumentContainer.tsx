import { Box } from '@mui/material'
import { DocumentCard } from '@/components'
import { DocumentCardAdaptation } from '@/components/DocumentCard/styles'
import { DocumentCardProps } from '@/components/DocumentCard/DocumentCardInterface'

interface DocumentData {
  title?: string
  link?: string
  date?: string
}

interface DocumentContainerProps {
  document?: DocumentData
  documents?: DocumentCardProps[]
  variant?: 'single' | 'multiple'
}

export const DocumentContainer = ({ 
  document, 
  documents, 
  variant = 'single' 
}: DocumentContainerProps) => {
  if (variant === 'single' && document) {
    return (
      <Box sx={{ mt: '28px', mb: '28px', mx: 'auto' }}>
        <DocumentCard
          title={document.title || ''}
          link={document.link || ''}
          date={document.date}
        />
      </Box>
    )
  }

  if (variant === 'multiple' && documents) {
    return (
      <Box sx={{ maxWidth: '1220px', mt: '28px', mx: 'auto' }}>
        <Box sx={DocumentCardAdaptation}>
          {documents.map((item, idx) => (
            <DocumentCard
              key={idx}
              title={item.title}
              link={item.link}
              date={item.date}
            />
          ))}
        </Box>
      </Box>
    )
  }

  return null
} 