import { DocumentCard, DocumentTitleSearch } from '@/components'
import { Box, Typography } from '@mui/material'
import { useTranslationData } from '@/hooks/useTranslationData'
import { DocumentCardAdaptation } from '@/components/DocumentCard/styles'
import { DocumentCardProps } from '@/components/DocumentCard/DocumentCardInterface'
import { useLocation } from 'react-router-dom'

interface BlockData {
	title?: string
	link?: string
	date?: string
	value?: string
	type?: string
	data?: DocumentCardProps[]
}

interface SpecCouncilsBlock {
	type: 'text' | 'document' | 'documents'
	content?: string
	data?: BlockData
}

interface SpecCouncilsData {
	title: string
	blocks: SpecCouncilsBlock[]
}

const TRANSLATION_BY_PATH: Record<string, string> = {
	'/training/special-councils/metallurgy/phd7744': 'spec-councils',
	'/training/special-councils/materials-science/phd-podolska': 'spec-councils-podolska',
	'/training/special-councils/materials-science/phd-oliinyk': 'spec-councils-oliinyk',
}

const SpecCouncilsPage = () => {
	const { pathname } = useLocation()
	const translationKey = TRANSLATION_BY_PATH[pathname] ?? 'spec-councils'
	const { data } = useTranslationData<SpecCouncilsData>(translationKey)

	if (!data) {
		return null
	}
	return (
		<Box sx={{ pl: { xxs: '0px', md: '50px' }, pb: '30px' }}>
			<DocumentTitleSearch title={data.title} search={false} />
			<Box>
				{data.blocks.map((block, index) => (
					<Box key={index}>
						{block.type === 'text' && (
							<Typography
								sx={{ mb: '14px', fontSize: '16px', fontWeight: 400 }}
							>
								{block.content}
							</Typography>
						)}
						{block.type === 'document' && block.data && (
							<Box sx={{ mt: '28px', mb: '28px', mx: 'auto' }}>
								<DocumentCard
									title={block.data.title || ''}
									link={block.data.link || ''}
									date={block.data.date}
								/>
							</Box>
						)}
						{block.type === 'documents' && (
							<Box sx={{ maxWidth: '1220px', m: '28px auto' }}>
								<Box sx={DocumentCardAdaptation}>
									{(block.data as DocumentCardProps[]).map((item, idx) => (
										<DocumentCard
											key={idx}
											title={item.title}
											link={item.link}
											date={item.date}
										/>
									))}
								</Box>
							</Box>
						)}
					</Box>
				))}
			</Box>
		</Box>
	)
}

export default SpecCouncilsPage
