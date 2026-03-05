import { DocumentCard, DocumentTitleSearch } from '@/components'
import { Box, Typography } from '@mui/material'
import { useTranslationData } from '@/hooks/useTranslationData'
import { PlansGridData } from '@/components/DocumentCard/DocumentCardInterface'
import { DocumentCardWrapper } from '@/components/DocumentCard/styles'
import { useState } from 'react'

const IndividualPlansPage = () => {
	const { data } = useTranslationData<PlansGridData>('plans')

	const [searchQuery, setSearchQuery] = useState('')

	if (!data) {
		return null
	}

	const hasNewStructure =
		data.generalPlans && data.individualPlans && data.generalPlans.length >= 0

	const query = searchQuery.toLowerCase().trim()

	const generalPlans = data.generalPlans ?? []
	const individualPlans = data.individualPlans ?? []

	const filteredGeneral = query
		? generalPlans.filter(item => item.title.toLowerCase().includes(query))
		: generalPlans

	const filteredIndividual = query
		? individualPlans.filter(
				row =>
					row.left.title.toLowerCase().includes(query) ||
					row.right.title.toLowerCase().includes(query)
		  )
		: individualPlans

	const handleSearchChange = (query: string) => {
		setSearchQuery(query)
	}

	const handleSearchSubmit = (query: string) => {
		setSearchQuery(query.trim())
	}

	const legacyRows = data.rows ?? []
	const filteredLegacyRows = query
		? legacyRows.filter(
				row =>
					row.left.title.toLowerCase().includes(query) ||
					row.right.title.toLowerCase().includes(query)
		  )
		: legacyRows

	return (
		<Box sx={DocumentCardWrapper}>
			<DocumentTitleSearch
				title={data.title}
				onSearchSubmit={handleSearchSubmit}
				onSearchChange={handleSearchChange}
			/>

			<Box sx={{ maxWidth: '1220px', m: '0px auto' }}>
				{hasNewStructure && (generalPlans.length > 0 || individualPlans.length > 0) ? (
					<>
						{filteredGeneral.length > 0 && (
							<Box sx={{ mb: '40px' }}>
								<Typography
									component="h2"
									sx={{
										fontSize: '24px',
										fontWeight: 700,
										color: '#242424',
										mb: '20px',
									}}
								>
									{data.generalPlansTitle ?? 'Загальні навчальні плани'}
								</Typography>
								<Box
									sx={{
										display: 'grid',
										gridTemplateColumns: { xxs: '1fr', sm: '1fr 1fr' },
										gap: '25px',
										maxWidth: '1220px',
									}}
								>
									{filteredGeneral.map((item, index) => (
										<DocumentCard
											key={index}
											title={item.title}
											link={item.link}
											date={item.date}
										/>
									))}
								</Box>
							</Box>
						)}

						{filteredIndividual.length > 0 && (
							<Box>
								<Typography
									component="h2"
									sx={{
										fontSize: '24px',
										fontWeight: 700,
										color: '#242424',
										mb: '20px',
									}}
								>
									{data.individualPlansTitle ?? 'Індивідуальні навчальні плани'}
								</Typography>
								<Box
									sx={{
										display: 'grid',
										gridTemplateColumns: { xxs: '1fr', sm: '1fr 1fr' },
										gap: '25px',
										justifyContent: 'center',
									}}
								>
								{filteredIndividual.flatMap((row, index) => [
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
						)}
					</>
				) : (
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xxs: '1fr', sm: '1fr 1fr' },
							gap: '25px',
							justifyContent: 'center',
						}}
					>
						{filteredLegacyRows.flatMap((row, index) => [
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
				)}
			</Box>
		</Box>
	)
}

export default IndividualPlansPage
