import { DocumentCard, DocumentTitleSearch } from '@/components'
import { Box } from '@mui/material'
import { useTranslationData } from '@/hooks/useTranslationData'
import { PlansGridData } from '@/components/DocumentCard/DocumentCardInterface'
import { DocumentCardWrapper } from '@/components/DocumentCard/styles'
import { useState } from 'react'

const IndividualPlansPage = () => {
	const { data } = useTranslationData<PlansGridData>('plans')

	const [searchQuery, setSearchQuery] = useState('')

	if (!data?.rows) {
		return null
	}

	const query = searchQuery.toLowerCase().trim()
	const filteredRows = query
		? data.rows.filter(
				row =>
					row.left.title.toLowerCase().includes(query) ||
					row.right.title.toLowerCase().includes(query)
		  )
		: data.rows

	const handleSearchChange = (query: string) => {
		setSearchQuery(query)
	}

	const handleSearchSubmit = (query: string) => {
		setSearchQuery(query.trim())
	}

	return (
		<Box sx={DocumentCardWrapper}>
			<DocumentTitleSearch
				title={data.title}
				onSearchSubmit={handleSearchSubmit}
				onSearchChange={handleSearchChange}
			/>

			<Box sx={{ maxWidth: '1220px', m: '0px auto' }}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xxs: '1fr', sm: '1fr 1fr' },
						gap: '25px',
						justifyContent: 'center',
					}}
				>
					{filteredRows.flatMap((row, index) => [
						<DocumentCard
							key={`${index}-left`}
							title={row.left.title}
							link={row.left.link}
							date={row.left.date}
						/>,
						<DocumentCard
							key={`${index}-right`}
							title={row.right.title}
							link={row.right.link}
							date={row.right.date}
						/>,
					])}
				</Box>
			</Box>
		</Box>
	)
}

export default IndividualPlansPage
