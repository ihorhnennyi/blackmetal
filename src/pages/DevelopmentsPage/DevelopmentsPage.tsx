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

	// Коректне кодування шляху (пробіли та "+" у назві файлу)
	const buildEncodedPath = (path: string) => {
		const parts = path.replace(/^\//, '').split('/')
		const filename = parts.pop() ?? ''
		const encoded = parts.length ? parts.join('/') + '/' + encodeURIComponent(filename) : encodeURIComponent(filename)
		return '/' + encoded
	}
	const encodedPdfPath = data.presentationPdfUrl ? buildEncodedPath(data.presentationPdfUrl) : null
	const pdfUrl =
		encodedPdfPath && typeof window !== 'undefined'
			? window.location.origin + encodedPdfPath
			: data.presentationPdfUrl ?? null
	const downloadUrl = data.presentationLink ? buildEncodedPath(data.presentationLink) : null

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
