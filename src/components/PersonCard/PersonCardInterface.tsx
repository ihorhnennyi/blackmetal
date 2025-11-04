interface ContactData {
	phone?: string
	email?: string
	googleScholar?: string
	orcid?: string
	scopus?: string
	researcherId?: string
	encyclopedia?: string
}

export interface PersonCardInterface {
	id?: string
	photo?: string
	position?: string
	name: string
	description?: string
	biography?: string
	researchDirection?: string
	teachingSubjects?: string
	specialization?: string
	contacts?: ContactData | Array<{ type: string; value: string }>
	labels?: PersonCardLabels
}

export interface PersonCardLabels {
	contacts: string
	researchDirection: string
	biography: string
	teachingSubjects: string
	specialization?: string
}

export interface PersonCardData {
	title: string
	labels?: PersonCardLabels
	data?: PersonCardInterface[]
	staffCards?: PersonCardInterface[]
	firstPersonCard?: PersonCardInterface
}
