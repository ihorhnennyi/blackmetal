import { DocumentCard, DocumentTitleSearch } from '@/components'
import { Box, Typography } from '@mui/material'
import { useTranslationData } from '@/hooks/useTranslationData'
import {
	Syllabus132Data,
	Syllabus132SectionItem,
} from '@/components/DocumentCard/DocumentCardInterface'
import {
	DocumentCardAdaptation,
	DocumentCardWrapper,
} from '@/components/DocumentCard/styles'
import { useMemo, useState } from 'react'

const filterItems = (items: Syllabus132SectionItem[], query: string) =>
	items.filter(item =>
		item.title.toLowerCase().includes(query.toLowerCase())
	)

const Syllabus132Page = () => {
	const { data } = useTranslationData<Syllabus132Data>('syllabus132')
	const [searchQuery, setSearchQuery] = useState('')

	const filteredSections = useMemo(() => {
		if (!data) return []
		const q = searchQuery.trim().toLowerCase()
		if (!q) return data.sections
		return data.sections
			.map(section => ({
				...section,
				items: filterItems(section.items, searchQuery),
			}))
			.filter(section => section.items.length > 0)
	}, [data, searchQuery])

	if (!data) {
		return null
	}

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
				{filteredSections.map((section, sectionIndex) => (
					<Box key={sectionIndex} sx={{ mb: 4 }}>
						<Typography
							component="h2"
							sx={{
								textAlign: 'center',
								mb: 2,
								fontWeight: 600,
								fontSize: { xs: '1rem', sm: '1.125rem' },
							}}
						>
							{section.sectionTitle}
						</Typography>
						<Box sx={DocumentCardAdaptation}>
							{section.items.map((item, index) => (
								<DocumentCard
									key={`${sectionIndex}-${index}`}
									title={item.title}
									link={item.link}
									date={item.date}
									titleAsLink
								/>
							))}
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	)
}

export default Syllabus132Page
