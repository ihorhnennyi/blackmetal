export interface MonoCardProps {
	title: string
	description?: string
	link: string
	image?: string
}

export interface MonoCardData {
	title: string
	data: MonoCardProps[]
}
