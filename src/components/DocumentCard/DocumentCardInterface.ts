export interface DocumentCardProps {
	title: string
	link: string
	date?: string
	image?: string
}

export interface DocumentCardData {
	title: string
	data: DocumentCardProps[]
}
