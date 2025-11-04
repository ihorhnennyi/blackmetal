import { Box } from '@mui/material'
import { DocumentTitleSearch, DepartmentElement } from '@/components'
import { useTranslationData } from '@/hooks/useTranslationData'
import { DepartmentsData } from '@/components/Departments/interfaces'

const TechnicalDepartmentsPage = () => {
	const { data } = useTranslationData<DepartmentsData>('departments')

	if (!data) {
		return null
	}
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				pl: { xxs: 0, md: '50px' },
			}}
		>
			<DocumentTitleSearch title={`${data.titles.technical}`} search={false} />
			<Box
				sx={{
					width: '100%',
					mt: 3,
					mb: 3,
					display: 'grid',
					gridTemplateColumns: {
						xxs: '1fr',
						sm: 'repeat(2, 1fr)',
						lg: 'repeat(3, 1fr)',
					},
					gap: '20px',
					justifyItems: 'center',
					maxWidth: '1440px',
					mx: 'auto',
				}}
			>
				{data.TechnicalDepartments.map(dep => (
					<Box
						key={dep.id}
						sx={{
							width: '100%',
							maxWidth: {
								xxl: '460px',
							},
						}}
					>
						<DepartmentElement
							fullName={dep.fullName}
							img={dep.img}
							href={dep.href}
						/>
					</Box>
				))}
			</Box>
		</Box>
	)
}

export default TechnicalDepartmentsPage
