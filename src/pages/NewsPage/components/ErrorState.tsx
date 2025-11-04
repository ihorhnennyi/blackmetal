import { Container, Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'

const ErrorState = () => {
  const { t } = useTranslation()

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Alert severity='error'>{t('notFound.title')}</Alert>
    </Container>
  )
}

export default ErrorState 