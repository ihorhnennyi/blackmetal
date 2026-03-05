import { Box } from '@mui/material'
import { DocumentTitleSearch, PresentationPlayer, DocumentCard } from '@/components'
import { DocumentCardAdaptation } from '@/components/DocumentCard/styles'

const DocumentsPage = () => {
	const normDocuments = [
		{
			title: 'Статут ІЧМ',
			link: '/norm_doc/ІЧМ Додаток 1 Статут ІЧМ.pdf',
		},
		{
			title: 'ІЧМ Додаток 4 Реєстрація Збірника в сфері медіа',
			link: '/norm_doc/ІЧМ Додаток 4 Реєстрація Збірника в сфері медіа.pdf',
		},
		{
			title: 'План забезпечення гендерної рівності ІЧМ',
			link: '/norm_doc/План забезпечення гендерної рівності ІЧМ.pdf',
		},
		{
			title: 'План забезпечення гендерної рівності ІЧМ (англ.)',
			link: '/norm_doc/План забезпечення гендерної рівності ІЧМ_англ.pdf',
		},
	]

	return (
		<Box
			sx={{
				pl: { xxs: '0px', md: '50px' },
			}}
		>
			<DocumentTitleSearch title='Нормативні документи' search={false} />
			{/* <Box
				sx={{
					width: '100%',
					zIndex: 1,
					mb: '30px',
				}}
			>
				<PresentationPlayer pdfUrl='/reg_doc.pdf' />
			</Box> */}

			<Box sx={{ maxWidth: '1220px', m: '0px auto', mb: 4 }}>
				<Box sx={DocumentCardAdaptation}>
					{normDocuments.map((doc, index) => (
						<DocumentCard
							key={index}
							title={doc.title}
							link={doc.link}
						/>
					))}
				</Box>
			</Box>

			<Box
				sx={{
					width: '100%',
					display: 'grid',
					gridTemplateColumns: { xxs: '1fr', sm: '1fr 1fr' },
					gap: { xxs: 2, sm: 3 },
					mb: 4,
				}}
			>
				<Box
					sx={{
						overflow: 'hidden',
						boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
					}}
				>
					<img
						src={`/documents/${encodeURIComponent('Свідоцтво атестація МОН.jpg')}`}
						alt='Свідоцтво про державну атестацію наукової установи'
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
