import { Box } from '@mui/material'
import { PersonInfo } from './PersonInfo'
import { PersonDetails } from './PersonDetails'

interface PersonContentProps {
	position: string
	name: string
	description: string
	researchDirection?: string
	teachingSubjects?: string
	biography?: string
	specialization?: string
	labels?: {
		researchDirection: string
		teachingSubjects: string
		biography: string
		specialization?: string
	}
}

export const PersonContent = ({ 
	position, 
	name, 
	description, 
	researchDirection, 
	teachingSubjects, 
	biography, 
	specialization,
	labels 
}: PersonContentProps) => {
	return (
		<Box
			sx={{
				flex: 1,
				backgroundColor: 'white',
				padding: '30px',
				'@media (max-width: 1024px)': {
					padding: '30px',
				},
			}}
		>
			<PersonInfo position={position} name={name} description={description} />
			<PersonDetails 
				researchDirection={researchDirection}
				teachingSubjects={teachingSubjects}
				biography={biography}
				specialization={specialization}
				labels={labels}
			/>
		</Box>
	)
} 