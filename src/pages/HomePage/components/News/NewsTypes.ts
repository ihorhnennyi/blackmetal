export interface NewsContentItem {
	type:
		| 'image'
		| 'text'
		| 'desc'
		| 'link'
		| 'navlink'
		| 'bold'
		| 'minititle'
		| 'list'
	value: string
	href?: string
	children?: NewsContentItem[]
}

export interface NewsItem {
	id: number
	title: string
	text: string
	imageUrl: string
	images?: string[]
	date: string
	content?: NewsContentItem[]

	onClick?: () => void
}
export interface TranslatedNewsData {
	newsTitle: string
	news: NewsItem[]
}
