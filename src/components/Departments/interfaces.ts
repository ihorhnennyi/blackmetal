export interface Department {
	id: number
	shortName: string
	fullName: string
	img: string
	href: string
}

export interface DepartmentsData {
	titles: {
		scientific: string
		laboratories: string
		technical: string
	}
	ScientificDepartments: Department[]
	Laboratories: Department[]
	TechnicalDepartments: Department[]
}
