export interface RouteConfig {
	path: string
	component: string
	title: string
	layout?: string
	showIn?: string
}

export interface RoutesConfig {
	[key: string]: RouteConfig
}
