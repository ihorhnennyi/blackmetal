export interface DocumentCardProps {
	title: string
	link: string
	date?: string
	image?: string
	/** У силабусах: без кнопок, назва — посилання на файл */
	titleAsLink?: boolean
}

export interface DocumentCardData {
	title: string
	data: DocumentCardProps[]
}

export interface Syllabus132SectionItem {
	title: string
	link: string
	date?: string
}

export interface Syllabus132Section {
	sectionTitle: string
	items: Syllabus132SectionItem[]
}

export interface Syllabus132Data {
	title: string
	sections: Syllabus132Section[]
}
