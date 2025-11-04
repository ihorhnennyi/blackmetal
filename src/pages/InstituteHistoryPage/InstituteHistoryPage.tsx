import { Box } from '@mui/material'
import { DocumentTitleSearch } from '@/components'
import { useTranslationData } from '@/hooks/useTranslationData'
import { InstituteHistoryData } from './types'
import { HistoryContent } from './components'

const InstituteHistoryPage = () => {
	const { data } = useTranslationData<InstituteHistoryData>('history')

	if (!data) {
		return null
	}

	return (
		<Box sx={{ pb: '30px', pl: { xxs: '0px', md: '50px' } }}>
			<DocumentTitleSearch title={data.title} search={false} />
			<HistoryContent data={data} />
		</Box>
	)
}

export default InstituteHistoryPage
