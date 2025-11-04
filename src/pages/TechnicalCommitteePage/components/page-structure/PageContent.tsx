import { Box } from '@mui/material'
import { DocumentTitleSearch, CustomTable } from '@/components'
import { TextBlock } from '../text-blocks'
import { ContactInfo } from '../contact-section'

interface TableData {
	headers: {
		scope: string
		codes: string
	}
	data: {
		scopeDescription: string
		standardizationCodes: string
	}
}

interface ContactData {
	title: string
	name: string
	position: string
	phone: string
	email: string
}

interface TechnicalCommitteeData {
	title: string
	subtitle: string
	description: string
	creationInfo: string
	functions: string
	scopeTitle: string
	table: TableData
	contact: ContactData
}

interface PageContentProps {
	data: TechnicalCommitteeData
}

export const PageContent = ({ data }: PageContentProps) => {
	const tableHeaders = [data.table.headers.scope, data.table.headers.codes]

	const tableRows = [
		{
			cells: [
				data.table.data.scopeDescription,
				data.table.data.standardizationCodes,
			],
		},
	]

	return (
		<Box sx={{ pb: '30px', pl: { md: '50px' } }}>
			<DocumentTitleSearch title={data.title} search={false} />

			<Box>
				<TextBlock content={data.subtitle} variant='title' />
				<TextBlock content={data.description} variant='title' />
				<TextBlock content={data.creationInfo} variant='text' />
				<TextBlock content={data.functions} variant='text' />
				<TextBlock content={data.scopeTitle} variant='title' />

				<CustomTable headers={tableHeaders} rows={tableRows} />

				<ContactInfo contact={data.contact} />
			</Box>
		</Box>
	)
}
