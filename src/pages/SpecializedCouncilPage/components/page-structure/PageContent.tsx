import { Box, Button } from '@mui/material'
import { DocumentTitleSearch } from '@/components'
import { BlockRenderer } from './BlockRenderer'
import { useNavigate } from 'react-router-dom'
import routes from '@/router/routes.json'

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
	const navigate = useNavigate()
	return (
		<Box sx={{ pl: { xxs: '0px', md: '50px' }, pb: '30px' }}>
			<DocumentTitleSearch title={data.title} search={false} />
			<Box>
				{data.blocks.map((block, index) => (
					<Box key={index}>
						<BlockRenderer block={block} />
					</Box>
				))}
				<Box sx={{ display: 'flex' }}>
					<Button
						onClick={() => navigate(routes.KimstachPage.path)}
						variant='contained'
						sx={{
							maxWidth: '600px',
							width: '100%',
							height: '42px',
							m: '0px auto',
							borderRadius: 0,
							boxShadow: 'none',
							textTransform: 'none',
						}}
					>
						Захист Кімстач
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
