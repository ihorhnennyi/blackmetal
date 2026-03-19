import { Box, Link, Typography } from '@mui/material'
import { UniversalSearch } from '@/components'
import { useTranslation } from 'react-i18next'
import { forwardRef } from 'react'

interface DocumentTitleSearchProps {
	title: string
	/** If set, the title is rendered as a link (e.g. to a PDF in a new tab). */
	titleHref?: string
	search?: boolean
	onSearchSubmit?: (query: string) => void
	onSearchChange?: (query: string) => void
}

export const DocumentTitleSearch = forwardRef<
	HTMLDivElement,
	DocumentTitleSearchProps
>(
	(
		{
			title,
			titleHref,
			search = true,
			onSearchSubmit = () => {},
			onSearchChange = () => {},
		},
		ref
	) => {
		const { t } = useTranslation()
		const titleSx = {
			fontSize: { xxs: '24px', xs: '26px', sm: '32px', md: '34px' },
			fontWeight: 600,
			lineHeight: 1.4,
			whiteSpace: 'wrap' as const,
		}
		return (
			<Box
				ref={ref}
				sx={{
					pt: '30px',
					pb: '22px',
					display: 'flex',
					justifyContent: 'space-between',
					gap: '25px',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				<Box sx={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>
					{titleHref ? (
						<Link
							href={titleHref}
							target='_blank'
							rel='noopener noreferrer'
							underline='hover'
							sx={{
								...titleSx,
								color: 'primary.main',
								textDecorationColor: 'primary.main',
							}}
						>
							{title}
						</Link>
					) : (
						<Typography sx={titleSx}>{title}</Typography>
					)}
				</Box>
				{search && (
					<UniversalSearch
						onSearch={onSearchSubmit}
						onChange={onSearchChange}
						placeholderKey={t('components.search')}
						sx={{
							width: { xxs: '100%', xs: '250px' },
							p: '5px',
							border: '1px solid #DFDFDF',
							bgcolor: '#FFFFFF ',
						}}
					/>
				)}
			</Box>
		)
	}
)

DocumentTitleSearch.displayName = 'DocumentTitleSearch'

export default DocumentTitleSearch
