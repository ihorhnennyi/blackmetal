import { MonoCard, DocumentTitleSearch } from '@/components'
import { Box } from '@mui/material'
import { useTranslationData } from '@/hooks/useTranslationData'
import { useState } from 'react'
import {
	MonoCardAdaptation,
	MonoCardWrapper,
} from '@/components/MonoCard/styles'
import { MonoCardData } from '@/components/MonoCard/MonoCardInterface'

const MonographsPage = () => {
	const { data } = useTranslationData<MonoCardData>('monographs')

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
		<Box sx={MonoCardWrapper}>
			<DocumentTitleSearch
				title={data.title}
				onSearchSubmit={handleSearchSubmit}
				onSearchChange={handleSearchChange}
			/>

			<Box sx={{ maxWidth: '1850px', m: '0px auto' }}>
				<Box sx={MonoCardAdaptation}>
					{filteredData.map((item, index) => (
						<MonoCard
							key={index}
							title={item.title}
							description={item.description}
							link={item.link}
							image={item.image}
						/>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default MonographsPage
