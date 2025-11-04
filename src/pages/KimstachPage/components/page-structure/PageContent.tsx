import { Box, Button } from '@mui/material'
import { DocumentTitleSearch } from '@/components'
import { BlockRenderer } from './BlockRenderer'

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

interface PageContentProps {
	data: SpecializedCouncilData
}

export const PageContent = ({ data }: PageContentProps) => {
	return (
		<Box sx={{ pl: { xxs: '0px', sm: '50px' }, pb: '30px' }}>
			<DocumentTitleSearch title={data.title} search={false} />
			<Box>
				{data.blocks.map((block, index) => (
					<Box key={index}>
						<BlockRenderer block={block} />
					</Box>
				))}
			</Box>
		</Box>
	)
}
