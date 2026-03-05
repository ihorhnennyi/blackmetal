import { Box, Button, Link } from '@mui/material'
import { DocumentTitleSearch, PresentationPlayer } from '@/components'
import { useTranslationData } from '@/hooks/useTranslationData'

interface DevelopmentsData {
	title: string
	presentationPdfUrl?: string
	presentationLink?: string
	presentationLabel?: string
}

const DevelopmentsPage = () => {
	const { data } = useTranslationData<DevelopmentsData>('developments')

	if (!data) {
		return null
	}

	const pdfUrl = data.presentationPdfUrl
		? encodeURI(data.presentationPdfUrl)
		: null
	const downloadUrl = data.presentationLink
		? encodeURI(data.presentationLink)
		: null

	return (
		<Box sx={{ pb: '30px', pl: { xs: '20px', md: '50px' } }}>
			<DocumentTitleSearch title={`${data.title}`} search={false} />
			{pdfUrl && (
				<Box sx={{ mt: 2 }}>
					<PresentationPlayer pdfUrl={pdfUrl} />
				</Box>
			)}
			{downloadUrl && (
				<Link
					href={downloadUrl}
					target='_blank'
					rel='noopener noreferrer'
					underline='none'
					sx={{ display: 'inline-block', mt: 2 }}
				>
					<Button variant='outlined' size='medium'>
						{data.presentationLabel}
					</Button>
				</Link>
			)}
		</Box>
	)
}

export default DevelopmentsPage
