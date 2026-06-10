import { useTranslationData } from '@/hooks/useTranslationData'
import { PageContent } from '@/pages/KimstachPage/components'

interface BlockData {
	title?: string
	link?: string
	date?: string
	value?: string
	type?: string
	data?: any[]
}

interface DefenseBlock {
	type: 'text' | 'smalltext' | 'document' | 'documents' | 'contacts'
	content?: string
	data?: BlockData
}

interface DefenseData {
	title: string
	blocks: DefenseBlock[]
}

const VyshnyakovPage = () => {
	const { data } = useTranslationData<DefenseData>('zahistVyshnyakov')

	if (!data) {
		return null
	}

	return <PageContent data={data} />
}

export default VyshnyakovPage
