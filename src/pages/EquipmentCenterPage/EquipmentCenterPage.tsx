import { Box } from '@mui/material'
import { useTranslationData } from '@/hooks/useTranslationData'
import {
	EquipmentCenterHeader,
	EquipmentItem,
	EquipmentCenterContact,
} from './components'
import { EquipmentCenterData } from './types'

const EquipmentCenterPage = () => {
	const { data } = useTranslationData<EquipmentCenterData>('equipment-center')

	const handleViewRegulation = () => {
		window.open(
			'https://isi.gov.ua/wp-content/uploads/2021/10/%D0%9F%D0%BE%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE-%D0%A6%D0%9A%D0%9F%D0%9F-2018.pdf',
			'_blank'
		)
	}

	if (!data) {
		return null
	}

	return (
		<Box
			sx={{
				pb: '30px',
				pl: { xs: '0ъpx', md: '50px' },
			}}
		>
			<EquipmentCenterHeader
				title={data.title}
				viewRegulation={data.viewRegulation}
				viewRegulation2={data.viewRegulation2}
				viewRegulation3={data.viewRegulation3}
				onViewRegulation={handleViewRegulation}
			/>

			<EquipmentItem
				title={data.equipment1}
				imageSrc='/SREC_img2.png'
				imageAlt='Desktop scanning electron microscope Coxem EM-40'
				equipmentDescriptionTitle={data.equipmentDescriptionTitle}
				equipmentDescription={data.equipmentDescription}
				applicationAreaTitle={data.applicationAreaTitle}
				applicationArea={data.applicationArea}
				technicalCharacteristicsTitle={data.technicalCharacteristicsTitle}
				tableData={data.tableData}
			/>

			<EquipmentItem
				title={data.equipment2}
				imageSrc='/SREC_img3.png'
				imageAlt='Optical microscope AXIOVERT 200M MAT'
				equipmentDescriptionTitle={data.equipmentDescriptionTitle}
				equipmentDescription={data.equipment2Description}
				applicationAreaTitle={data.applicationAreaTitle}
				applicationArea={data.equipment2ApplicationArea}
				methods={data.equipment2Methods}
			/>

			<EquipmentItem
				title={data.equipment3}
				imageSrc='/SREC_img4.png'
				imageAlt='Microhardness tester LHV5-1000Z'
				equipmentDescriptionTitle={data.equipmentDescriptionTitle}
				equipmentDescription={data.equipment3Description}
				applicationAreaTitle={data.applicationAreaTitle}
				applicationArea={data.equipment3ApplicationArea}
				technicalCharacteristicsTitle={data.technicalCharacteristicsTitle}
				tableData={data.equipment3TableData}
				additionalInfo={{
					technicalCharacteristics: data.equipment3TechnicalCharacteristics,
					magnification: data.equipment3Magnification,
					motorizedFunctions: data.equipment3MotorizedFunctions,
					software: data.equipment3Software,
					operations: data.equipment3Operations,
					analysis: data.equipment3Analysis,
					stage: data.equipment3Stage,
				}}
			/>

			<EquipmentCenterContact
				contactTitle={data.contactTitle}
				contactName={data.contactName}
				contactPhone={data.contactPhone}
				contactEmail={data.contactEmail}
			/>
		</Box>
	)
}

export default EquipmentCenterPage
