import { useTranslationData } from '@/hooks/useTranslationData'
import { PageContent } from './components'

interface BlockData {
	title?: string
	link?: string
	date?: string
	value?: string
	type?: string
	data?: any[]
}

interface SpecializedCouncilBlock {
	type: 'text' | 'smalltext' | 'document' | 'documents' | 'contacts'
	content?: string
	data?: BlockData
}

interface SpecializedCouncilData {
	title: string
	blocks: SpecializedCouncilBlock[]
}

const SpecializedCouncilPage = () => {
	const { data } = useTranslationData<SpecializedCouncilData>('zahistKimstach')

	if (!data) {
		return null
	}

	return <PageContent data={data} />
}

export default SpecializedCouncilPage
