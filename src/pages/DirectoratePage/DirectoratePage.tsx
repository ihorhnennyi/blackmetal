import { Box } from '@mui/material'
import { DocumentTitleSearch, PersonCard } from '@/components'
import { useTranslationData } from '@/hooks/useTranslationData'
import { PersonCardData } from '@/components/PersonCard/PersonCardInterface'
import {
	PersonCardAdaptation,
	PersonCardWrapper,
} from '@/components/PersonCard/styles'

const DirectoratePage = () => {
	const { data } = useTranslationData<PersonCardData>('directorate')
	const { data: labelsData } = useTranslationData<{
		contacts: string
		researchDirection: string
		teachingSubjects: string
		biography: string
		specialization: string
	}>('labels')

	if (!data) {
		return null
	}
	const sorted = [...(data.data || [])].sort((a, b) => {
		const aHas = !!a.photo && String(a.photo).trim() !== ''
		const bHas = !!b.photo && String(b.photo).trim() !== ''
		if (aHas === bHas) return 0
		return aHas ? -1 : 1
	})
	return (
		<Box sx={PersonCardWrapper}>
			<DocumentTitleSearch title={`${data.title}`} search={false} />
			<Box sx={{ maxWidth: '1817px', m: '0px auto' }}>
				<Box sx={PersonCardAdaptation}>
					{sorted.map((item, index) => (
						<PersonCard
							key={index}
							id={item.id}
							photo={item.photo}
							position={item.position}
							name={item.name}
							description={item.description}
							biography={item.biography}
							researchDirection={item.researchDirection}
							teachingSubjects={item.teachingSubjects}
							contacts={item.contacts}
							labels={data.labels! || labelsData }
						/>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default DirectoratePage
