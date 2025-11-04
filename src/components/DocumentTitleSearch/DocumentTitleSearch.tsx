import { Box, Typography } from '@mui/material'
import { UniversalSearch } from '@/components'
import { useTranslation } from 'react-i18next'
import { forwardRef } from 'react'

interface DocumentTitleSearchProps {
	title: string
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
			search = true,
			onSearchSubmit = () => {},
			onSearchChange = () => {},
		},
		ref
	) => {
		const { t } = useTranslation()
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
					<Typography
						sx={{
							fontSize: { xxs: '24px', xs: '26px', sm: '32px', md: '34px' },
							fontWeight: 600,
							lineHeight: 1.4,
							whiteSpace: 'wrap',
						}}
					>
						{title}
					</Typography>
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
