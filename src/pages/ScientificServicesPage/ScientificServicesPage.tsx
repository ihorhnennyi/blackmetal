import { useTranslationData } from '@/hooks/useTranslationData'
import { PageContent } from './components'

interface ScientificServicesData {
  title: string
  mainDescription: string
  services: string[]
  clientsDescription: string
  scientificServicesTitle: string
  scientificServices: string[]
  numberedServices: string[]
}

const ScientificServicesPage = () => {
  const { data } = useTranslationData<ScientificServicesData>('scientific-services')

  if (!data) {
    return null
  }

  return <PageContent data={data} />
}

export default ScientificServicesPage