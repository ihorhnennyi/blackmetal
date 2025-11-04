export interface NavItem {
	id: string
	label: string
	href?: string
	link?: string
	items?: NavItem[]
	icon?: React.ReactNode
}

export interface NavigationData {
	navItems: NavItem[]
}

export interface HeaderTranslation {
	searchPlaceholder: string
	navItems: NavItem[]
}
