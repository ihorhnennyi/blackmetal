import { Box } from '@mui/material'
import { useTranslationData } from '@/hooks/useTranslationData'
import { PersonCardData } from '@/components/PersonCard/PersonCardInterface'
import { useParams } from 'react-router-dom'
import { PersonSidebar, PersonContent } from './components'

const PersonPage = () => {
	const { id } = useParams<{ id: string }>()
	

	const { data: directorateData } = useTranslationData<PersonCardData>('directorate')
	const { data: heatTechData } = useTranslationData<PersonCardData>('heat-tech')
	const { data: flatRollingData } = useTranslationData<PersonCardData>('flat-rolling')
	const { data: structurePropertiesData } = useTranslationData<PersonCardData>('structure-properties')
	const { data: physTechData } = useTranslationData<PersonCardData>('phys-tech')
	const { data: htMachineryData } = useTranslationData<PersonCardData>('ht-machinery')
	const { data: equipmentData } = useTranslationData<PersonCardData>('equipment')
	const { data: dtoSteelData } = useTranslationData<PersonCardData>('dto-steel')
	const { data: pressureData } = useTranslationData<PersonCardData>('pressure')
	const { data: ironRefiningData } = useTranslationData<PersonCardData>('iron-refining')
	const { data: pigIronData } = useTranslationData<PersonCardData>('pig-iron')
	const { data: physChemData } = useTranslationData<PersonCardData>('phys-chem')
	const { data: organizationData } = useTranslationData<PersonCardData>('organization')
	const { data: qualityData } = useTranslationData<PersonCardData>('quality')
	const { data: mainCouncilData } = useTranslationData<PersonCardData>('maincouncil')
	const { data: youngCouncilData } = useTranslationData<PersonCardData>('youngcouncil')
	const { data: labelsData } = useTranslationData<{
		contacts: string
		researchDirection: string
		teachingSubjects: string
		biography: string
		specialization: string
	}>('labels')
	
	let person = null
	let labels = null
	
	const dataSources = [
		mainCouncilData,
		youngCouncilData,
		directorateData,
		heatTechData,
		flatRollingData,
		structurePropertiesData,
		physTechData,
		htMachineryData,
		equipmentData,
		dtoSteelData,
		pressureData,
		ironRefiningData,
		pigIronData,
		physChemData,
		organizationData,
		qualityData
	]
	
	for (const data of dataSources) {
		if (data) {
			console.log('Checking data source:', data.title)
			

			const personArray = data.data || data.staffCards
			if (personArray && Array.isArray(personArray)) {
				console.log('Checking array with', personArray.length, 'items')
				const foundPerson = personArray.find(item => item.id === id)
			if (foundPerson) {
					console.log('Found person in array:', foundPerson.name)
				person = foundPerson
					labels = data.labels
					break
				}
			}
			
			
			if (data.firstPersonCard && data.firstPersonCard.id === id) {
				console.log('Found person in firstPersonCard:', data.firstPersonCard.name)
				person = data.firstPersonCard
				labels = data.labels
				break
			}
		}
	}

	if (!person) {
		return (
			<Box sx={{ 
				pl: { xxs: '0px', sm: '50px' },
				pt: 4,
				fontSize: '18px',
				color: '#666'
			}}>
				Співробітника не знайдено
			</Box>
		)
	}

	return (
		<Box
			sx={{
				pl: { xxs: '0px', sm: '50px' },
				pt: { xxs: '20px', sm: '96px' },
				pb: '30px',
			}}
		>
			<Box
				sx={{
					width: '100%',
					zIndex: 1,
				}}
			>
				<Box
					sx={{
						backgroundColor: 'white',
						padding: '0px',
						backdropFilter: 'blur(10px)',
						display: 'flex',
						gap: '0px',
						alignItems: 'stretch',
						'@media (max-width: 1024px)': {
							flexDirection: 'column',
							alignItems: 'center',
							padding: '0px',
						},
					}}
				>
					<PersonSidebar 
						photo={person.photo}
						contacts={person.contacts}
						contactsLabel={labels?.contacts || labelsData?.contacts || 'Контакти'}
					/>
					
					<PersonContent 
						position={person.position || ''}
						name={person.name || ''}
						description={person.description || ''}
						researchDirection={person.researchDirection}
						teachingSubjects={person.teachingSubjects}
						biography={person.biography}
						specialization={person.specialization}
						labels={labels || labelsData}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default PersonPage