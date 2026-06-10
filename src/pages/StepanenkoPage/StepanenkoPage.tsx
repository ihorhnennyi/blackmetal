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

const StepanenkoPage = () => {
	const { data } = useTranslationData<DefenseData>('zahistStepanenko')

	if (!data) {
		return null
	}

	return <PageContent data={data} />
}

export default StepanenkoPage
