import { DocumentCard, DocumentTitleSearch } from '@/components'
import { Box } from '@mui/material'
import { useTranslationData } from '@/hooks/useTranslationData'
import { DocumentCardData } from '@/components/DocumentCard/DocumentCardInterface'
import {
	DocumentCardAdaptation,
	DocumentCardWrapper,
} from '@/components/DocumentCard/styles'
import { useState } from 'react'

const Syllabus132Page = () => {
	const { data } = useTranslationData<DocumentCardData>('syllabus132')

	const [searchQuery, setSearchQuery] = useState('')

	if (!data) {
		return null
	}

	const filteredData = data.data.filter(item =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase())
	)

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
				<Box sx={DocumentCardAdaptation}>
					{filteredData.map((item, index) => (
						<DocumentCard
							key={index}
							title={item.title}
							link={item.link}
							date={item.date}
						/>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default Syllabus132Page
