import { Box, Button, Link as MUILink, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DocumentCardProps } from './DocumentCardInterface'

const DocumentCard = ({ title, link, date, image }: DocumentCardProps) => {
	const { t } = useTranslation()

	const getFileNameFromUrl = (url: string): string => {
		if (!url) return 'document'
		const parts = url.split('/')
		return parts[parts.length - 1] || 'document'
	}

	const getFileExtensionFromUrl = (url: string): string => {
		if (!url) return 'docx'
		const parts = url.split('.')
		return parts[parts.length - 1] || 'document'
	}

	const fileName = getFileNameFromUrl(link)
	const fileExtension = getFileExtensionFromUrl(fileName)
	const fileLink = `${link}`
	const imageLink = `/${image}`

	return (
		<Box
			sx={{
				maxWidth: '390px',
				width: '100%',
				minHeight: '171px',
				m: '0px auto',
				py: '25px',
				px: '20px',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				gap: '30px',
				border: '1px solid #DFDFDF',
				bgcolor: '#FFFFFF',
			}}
		>
			<Typography
				sx={{
					position: 'absolute',
					top: '7px',
					right: '7px',
					fontSize: '12px',
					color: '#8A8A8A',
				}}
			>
				{date}
			</Typography>
			<Typography
				sx={{
					position: 'absolute',
					top: '7px',
					left: '7px',
					fontSize: '12px',
					fontWeight: 700,
					textTransform: 'uppercase',
					color:
						fileExtension === 'pdf'
							? 'red'
							: fileExtension === 'docx' || fileExtension === 'doc'
							? 'blue'
							: '#8A8A8A',
				}}
			>
				{fileExtension === 'view?usp=sharing' ? 'google drive' : fileExtension}
			</Typography>

			{image && (
				<Box
					component='img'
					src={imageLink}
					sx={{
						width: '304px',
						height: '304px',
						m: '0px auto',
						objectFit: 'contain',
					}}
				/>
			)}

			<Typography
				sx={{
					maxWidth: '304px',
					m: '0px auto',
					mt: '-4px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '18px',
					fontWeight: 600,
					color: '#242424',
					textAlign: 'center',
					flex: 1,
				}}
			>
				{title}
			</Typography>
			<Box
				sx={{
					maxWidth: '304px',
					width: '100%',
					m: '0px auto',
					display: 'flex',
					justifyContent: 'center',
					gap: '20px',
					flexWrap: 'wrap',
				}}
			>
				{['docx', 'doc', 'zip', 'rar'].includes(fileExtension) ? (
					<>
						<MUILink
							href={fileLink}
							rel='noopener noreferrer'
							sx={{ width: { xxs: '100%', xs: '142px' } }}
						>
							<Button
								variant='outlined'
								sx={{
									width: '100%',
									height: '42px',
									borderRadius: 0,
									textTransform: 'none',
									color: '#000000',
								}}
							>
								{t('components.document-card.download')}
							</Button>
						</MUILink>
					</>
				) : ['pdf', 'jpg', 'svg', 'jpeg', 'png', 'webp', 'jfif'].includes(
						fileExtension
				  ) ? (
					<>
						<MUILink
							target='_blank'
							href={fileLink}
							rel='noopener noreferrer'
							sx={{ width: { xxs: '100%', xs: '142px' } }}
						>
							<Button
								variant='contained'
								sx={{
									width: '100%',
									height: '42px',
									borderRadius: 0,
									boxShadow: 'none',
									textTransform: 'none',
								}}
							>
								{t('components.document-card.see')}
							</Button>
						</MUILink>
						<MUILink
							href={fileLink}
							rel='noopener noreferrer'
							download={fileName}
							sx={{ width: { xxs: '100%', xs: '142px' } }}
						>
							<Button
								variant='outlined'
								sx={{
									width: '100%',
									height: '42px',
									borderRadius: 0,
									textTransform: 'none',
									color: '#000000',
								}}
							>
								{t('components.document-card.download')}
							</Button>
						</MUILink>
					</>
				) : (
					<>
						<MUILink
							target='_blank'
							href={link}
							rel='noopener noreferrer'
							sx={{ width: { xxs: '100%', xs: '142px' } }}
						>
							<Button
								variant='contained'
								sx={{
									width: '100%',
									height: '42px',
									borderRadius: 0,
									boxShadow: 'none',
									textTransform: 'none',
								}}
							>
								{t('components.document-card.see')}
							</Button>
						</MUILink>
					</>
				)}
			</Box>
		</Box>
	)
}

export default DocumentCard
