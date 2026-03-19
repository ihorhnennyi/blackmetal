import { Box } from '@mui/material'

export interface OfficePresentationEmbedProps {
	/** Повна URL файлу (.ppt / .pptx), доступна з інтернету (Office завантажує її з сервера) */
	absoluteFileUrl: string
	title?: string
	/** Висота iframe, px */
	height?: number
}

/**
 * Вбудований перегляд PowerPoint через Microsoft Office Online.
 * Працює лише якщо файл доступний за публічною HTTPS-адресою (не з localhost).
 */
export const OfficePresentationEmbed = ({
	absoluteFileUrl,
	title = 'Презентація PowerPoint',
	height = 600,
}: OfficePresentationEmbedProps) => {
	const embedSrc = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteFileUrl)}`

	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: '100%',
				border: '1px solid #dfdfdf',
				borderRadius: 1,
				overflow: 'hidden',
				bgcolor: '#f5f5f5',
				boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
			}}
		>
			<iframe
				title={title}
				src={embedSrc}
				width='100%'
				height={height}
				style={{ border: 'none', display: 'block' }}
				allowFullScreen
			/>
		</Box>
	)
}

export default OfficePresentationEmbed
