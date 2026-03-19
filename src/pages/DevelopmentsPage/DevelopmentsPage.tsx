import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Link,
	Typography,
} from '@mui/material'
import {
	DocumentTitleSearch,
	PresentationPlayer,
	OfficePresentationEmbed,
} from '@/components'
import { useTranslationData } from '@/hooks/useTranslationData'
import { useTranslation } from 'react-i18next'

interface DevelopmentPresentation {
	id: string
	label: string
	pdfPath: string
	/** .ppt / .pptx — перегляд через Microsoft Office Online (не працює на localhost) */
	officePresentationPath?: string
	downloadPath?: string
	downloadLabel?: string
}

interface DevelopmentsData {
	title: string
	openInNewTab: string
	officeLocalhostNote?: string
	officeHttpNote?: string
	presentations: DevelopmentPresentation[]
}

const FALLBACK_PRESENTATIONS: DevelopmentPresentation[] = [
	{
		id: 'ichm-2019-2024',
		label: 'ІЧМ 2019–2024 (презентація)',
		pdfPath: '/developments/ІЧМ 2019-2024 22 мая+.pdf',
		officePresentationPath: '/developments/ІЧМ 2019-2024 22 мая+.ppt',
		downloadLabel: 'Скачати презентацію (.ppt)',
	},
	{
		id: 'ichm-rozrobky',
		label: 'ІЧМ — розробки',
		pdfPath: '/ІЧМ розробки.pdf',
	},
]

/** Пробіли та спецсимволи в назві файлу */
const buildEncodedPath = (path: string) => {
	const trimmed = path?.trim() || ''
	if (!trimmed) return '/'
	const parts = trimmed.replace(/^\//, '').split('/')
	const filename = parts.pop() ?? ''
	const encoded = parts.length
		? parts.join('/') + '/' + encodeURIComponent(filename)
		: encodeURIComponent(filename)
	return '/' + encoded
}

const isLocalDevHost = () => {
	if (typeof window === 'undefined') return true
	const h = window.location.hostname
	return h === 'localhost' || h === '127.0.0.1'
}

const DevelopmentsPage = () => {
	const { i18n } = useTranslation()
	const { data, loading } = useTranslationData<DevelopmentsData>('developments')

	const title =
		data?.title ??
		(i18n.language.startsWith('en') ? 'Main Developments' : 'Основні розробки')
	const openInNewTab =
		data?.openInNewTab ??
		(i18n.language.startsWith('en') ? 'Open PDF in new tab' : 'Відкрити PDF у новій вкладці')
	const officeLocalhostNote =
		data?.officeLocalhostNote ??
		(i18n.language.startsWith('en')
			? 'PowerPoint embed works on the published site (HTTPS). On localhost the PDF version is shown.'
			: 'Перегляд PowerPoint на опублікованому сайті. На localhost показано PDF.')
	const officeHttpNote =
		data?.officeHttpNote ??
		(i18n.language.startsWith('en')
			? 'If the viewer is empty, try HTTPS or open the PDF / download .ppt.'
			: 'Якщо вікно порожнє — потрібен HTTPS або відкрийте PDF / завантажте .ppt.')

	const presentations = data?.presentations?.length
		? data.presentations
		: FALLBACK_PRESENTATIONS

	if (loading && !data) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: 240,
					pl: { xs: '20px', md: '50px' },
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Box sx={{ pb: '30px', pl: { xs: '20px', md: '50px' } }}>
			<DocumentTitleSearch title={title} search={false} />

			{presentations.map((item, index) => {
				const pdfHref = buildEncodedPath(item.pdfPath)
				const officeHref = item.officePresentationPath
					? buildEncodedPath(item.officePresentationPath)
					: null
				const absoluteOfficeUrl =
					officeHref && typeof window !== 'undefined'
						? `${window.location.origin}${officeHref}`
						: ''

				const downloadHref =
					item.downloadPath != null && item.downloadPath !== ''
						? buildEncodedPath(item.downloadPath)
						: officeHref

				const useOfficeViewer =
					Boolean(item.officePresentationPath) && !isLocalDevHost()

				const isHttps =
					typeof window !== 'undefined' &&
					window.location.protocol === 'https:'

				return (
					<Box
						key={item.id}
						sx={{
							mt: index === 0 ? 3 : 5,
							maxWidth: { md: 'min(100%, 960px)' },
						}}
					>
						<Typography
							component='h2'
							variant='h6'
							sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}
						>
							{item.label}
						</Typography>

						{item.officePresentationPath && isLocalDevHost() && (
							<Alert severity='info' sx={{ mb: 2 }}>
								{officeLocalhostNote}
							</Alert>
						)}

						{useOfficeViewer && absoluteOfficeUrl ? (
							<>
								{!isHttps && (
									<Alert severity='warning' sx={{ mb: 2 }}>
										{officeHttpNote}
									</Alert>
								)}
								<OfficePresentationEmbed
									absoluteFileUrl={absoluteOfficeUrl}
									title={item.label}
									height={620}
								/>
							</>
						) : (
							<PresentationPlayer pdfUrl={pdfHref} />
						)}

						<Box
							sx={{
								mt: 2,
								display: 'flex',
								flexWrap: 'wrap',
								gap: 2,
								alignItems: 'center',
							}}
						>
							<Button
								component={Link}
								href={pdfHref}
								target='_blank'
								rel='noopener noreferrer'
								variant='outlined'
								size='medium'
								color='primary'
							>
								{openInNewTab}
							</Button>
							{downloadHref && item.downloadLabel && (
								<Button
									component={Link}
									href={downloadHref}
									target='_blank'
									rel='noopener noreferrer'
									variant='contained'
									size='medium'
									color='primary'
								>
									{item.downloadLabel}
								</Button>
							)}
						</Box>
					</Box>
				)
			})}
		</Box>
	)
}

export default DevelopmentsPage
