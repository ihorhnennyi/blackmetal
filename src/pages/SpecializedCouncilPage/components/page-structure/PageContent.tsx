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
	type: 'text' | 'smalltext' | 'sectionTitle' | 'document' | 'documents' | 'contacts'
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
		<Box
			sx={{
				px: { xxs: '16px', sm: '24px' },
				pl: { md: '50px' },
				pr: { md: '24px' },
				pb: '30px',
			}}
		>
			<Box sx={{ maxWidth: '1220px', mx: 'auto', width: '100%' }}>
				<DocumentTitleSearch title={data.title} search={false} />
			</Box>
			<Box sx={{ maxWidth: '1220px', mx: 'auto', width: '100%' }}>
				{data.blocks.map((block, index) => (
					<Box key={index}>
						<BlockRenderer block={block} />
					</Box>
				))}
				<Box sx={{ display: 'flex', mt: '28px' }}>
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
