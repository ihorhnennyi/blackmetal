import { useTranslationData } from '@/hooks/useTranslationData'
import { PageContent } from './components'

interface TechnicalCommitteeData {
  title: string
  subtitle: string
  description: string
  creationInfo: string
  functions: string
  scopeTitle: string
  table: {
    headers: {
      scope: string
      codes: string
    }
    data: {
      scopeDescription: string
      standardizationCodes: string
    }
  }
  contact: {
    title: string
    name: string
    position: string
    phone: string
    email: string
  }
}

const TechnicalCommittee = () => {
  const { data } = useTranslationData<TechnicalCommitteeData>('technical-committee')

  if (!data) {
    return null
  }

  return <PageContent data={data} />
}

export default TechnicalCommittee
