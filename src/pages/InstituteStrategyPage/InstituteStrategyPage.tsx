import { Box } from '@mui/material'
import { DocumentTitleSearch } from '@/components'
import { useTranslationData } from '@/hooks/useTranslationData'
import { SectionHeader, StrategyDirectionsList, MainText } from './components'

interface StrategyData {
	title: string
	pageTitle: string
	mainText: string
	strategicDirectionsTitle: string
	strategicDirections: string[]
}

const InstituteStrategyPage = () => {
	const { data } = useTranslationData<StrategyData>('strategy')

	if (!data) {
		return null
	}

	return (
		<Box
			sx={{
				pb: '30px',
				pl: { xxs: '0px', md: '50px' },
				pr: { xs: '20px', sm: '50px' },
			}}
		>
			<DocumentTitleSearch title={data.title} search={false} />

			<MainText>{data.mainText}</MainText>

			<SectionHeader title={data.strategicDirectionsTitle} />

			<StrategyDirectionsList directions={data.strategicDirections} />
		</Box>
	)
}

export default InstituteStrategyPage
