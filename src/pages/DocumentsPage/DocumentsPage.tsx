import { Box, Typography } from '@mui/material'
import { DocumentTitleSearch, PresentationPlayer } from '@/components'

const DocumentsPage = () => {
	return (
		<Box
			sx={{
				pl: { xxs: '0px', md: '50px' },
			}}
		>
			<DocumentTitleSearch title='Нормативні документи' search={false} />
			<Box
				sx={{
					width: '100%',
					zIndex: 1,
					mb: '30px',
				}}
			>
				<PresentationPlayer pdfUrl='/reg_doc.pdf' />
			</Box>

			<Box
				sx={{
					width: '100%',
					display: 'flex',
					gap: { xxs: 2, sm: 3 },
					flexDirection: { xxs: 'column', md: 'row' },
					mb: 4,
				}}
			>
				<Box
					sx={{
						flex: 1,
						overflow: 'hidden',
						boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
					}}
				>
					<img
						src='/certificate1.png'
						alt='Сертифікат 1'
						style={{
							width: '100%',
							height: 'auto',
							display: 'block',
							objectFit: 'cover',
						}}
					/>
				</Box>

				<Box
					sx={{
						flex: 1,
						overflow: 'hidden',
						boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
					}}
				>
					<img
						src='/certificate2.png'
						alt='Сертифікат 2'
						style={{
							width: '100%',
							height: 'auto',
							display: 'block',
							objectFit: 'cover',
						}}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default DocumentsPage
