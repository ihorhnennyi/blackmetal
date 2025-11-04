import { Box, Typography } from '@mui/material'
import { DocumentTitleSearch } from '@/components'
import { ServiceList } from '../containers'

interface ScientificServicesData {
	title: string
	mainDescription: string
	services: string[]
	clientsDescription: string
	scientificServicesTitle: string
	scientificServices: string[]
	numberedServices: string[]
}

interface PageContentProps {
	data: ScientificServicesData
}

export const PageContent = ({ data }: PageContentProps) => {
	const textStyle = {
		fontSize: '18px',
		color: '#333',
		mb: '24px',
		textAlign: 'justify' as const,
		lineHeight: 1.6,
	}

	const titleStyle = {
		fontSize: '20px',
		fontWeight: 600,
		color: '#000',
		mb: '16px',
		mt: '32px',
	}

	return (
		<Box
			sx={{
				pb: '30px',
				pl: { md: '50px' },
			}}
		>
			<DocumentTitleSearch title={data.title} search={false} />

			<Typography sx={textStyle}>{data.mainDescription}</Typography>

			<ServiceList services={data.services} numbered={true} />

			<Typography sx={textStyle}>{data.clientsDescription}</Typography>

			<Typography sx={titleStyle}>{data.scientificServicesTitle}</Typography>

			<ServiceList services={data.scientificServices} numbered={false} />

			<ServiceList services={data.numberedServices} numbered={false} />
		</Box>
	)
}
