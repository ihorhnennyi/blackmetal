export interface TableDataItem {
	category: string
	items: [string, string][]
}

export interface EquipmentCenterData {
	title: string
	viewRegulation: string
	viewRegulation2: string
	viewRegulation3: string
	equipment1: string
	equipmentDescriptionTitle: string
	equipmentDescription: string
	applicationAreaTitle: string
	applicationArea: string
	technicalCharacteristicsTitle: string
	tableData: TableDataItem[]
	equipment2: string
	equipment2Description: string
	equipment2ApplicationArea: string
	equipment2Methods: string[]
	equipment3: string
	equipment3Description: string
	equipment3ApplicationArea: string
	equipment3TechnicalCharacteristics: string
	equipment3Magnification: string
	equipment3MotorizedFunctions: string
	equipment3Software: string
	equipment3Operations: string[]
	equipment3Analysis: string
	equipment3Stage: string
	equipment3TableData: TableDataItem[]
	contactTitle: string
	contactName: string
	contactPhone: string
	contactEmail: string
}

export interface EquipmentCenterHeaderProps {
	title: string
	viewRegulation: string
	viewRegulation2: string
	viewRegulation3: string
	onViewRegulation: () => void
}

export interface EquipmentItemProps {
	title: string
	imageSrc: string
	imageAlt: string
	equipmentDescriptionTitle: string
	equipmentDescription: string
	applicationAreaTitle: string
	applicationArea: string
	technicalCharacteristicsTitle?: string
	tableData?: TableDataItem[]
	methods?: string[]
	additionalInfo?: {
		technicalCharacteristics?: string
		magnification?: string
		motorizedFunctions?: string
		software?: string
		operations?: string[]
		analysis?: string
		stage?: string
	}
}

export interface EquipmentCenterContactProps {
	contactTitle: string
	contactName: string
	contactPhone: string
	contactEmail: string
}
