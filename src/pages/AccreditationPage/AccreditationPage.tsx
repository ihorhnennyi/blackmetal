import { DocumentCard, DocumentTitleSearch } from '@/components'
import { Box, Button, Link as MUILink, Typography } from '@mui/material'
import { useTranslationData } from '@/hooks/useTranslationData'
import { DocumentCardData } from '@/components/DocumentCard/DocumentCardInterface'
import {
	DocumentCardAdaptation,
	DocumentCardWrapper,
} from '@/components/DocumentCard/styles'
import { useState } from 'react'

/** Той самий корпус, що й у `DocumentCard` (квадрати 390px) */
const documentCardShellSx = {
	maxWidth: '390px',
	width: '100%',
	minHeight: '171px',
	m: '0px auto',
	py: '25px',
	px: '20px',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	gap: '30px',
	border: '1px solid #DFDFDF',
	bgcolor: '#FFFFFF',
} as const

const cardTitleSx = {
	maxWidth: '304px',
	m: '0px auto',
	mt: '-4px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '18px',
	fontWeight: 600,
	color: '#242424',
	textAlign: 'center',
	flex: 1,
}

const cardButtonsRowSx = {
	maxWidth: '304px',
	width: '100%',
	m: '0px auto',
	display: 'flex',
	justifyContent: 'center',
	gap: '20px',
	flexWrap: 'wrap',
}

interface VisitProgramBlock {
	sectionTitle?: string
	documentTitle: string
	pdfPath: string
}

interface OpenMeetingBlock {
	sectionTitle: string
	timeLabel: string
	joinLabel: string
	zoomUrl: string
	conferenceIdLabel: string
	conferenceId: string
	passwordLabel: string
	password: string
}

interface AccreditationPageData extends DocumentCardData {
	visitProgram?: VisitProgramBlock
	openMeeting?: OpenMeetingBlock
}

const OpenMeetingDocumentSquare = ({ block }: { block: OpenMeetingBlock }) => (
	<Box sx={documentCardShellSx}>
		<Typography
			sx={{
				position: 'absolute',
				top: '7px',
				left: '7px',
				fontSize: '12px',
				fontWeight: 700,
				textTransform: 'uppercase',
				color: '#2D7A84',
			}}
		>
			zoom
		</Typography>

		<Typography sx={{ ...cardTitleSx, flex: 'none' }}>{block.sectionTitle}</Typography>

		<Box
			sx={{
				maxWidth: '304px',
				width: '100%',
				m: '0 auto',
				textAlign: 'center',
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: 1,
				minHeight: 0,
			}}
		>
			<Typography sx={{ fontSize: '15px', color: '#242424', lineHeight: 1.5 }}>
				{block.timeLabel}
			</Typography>
			<Typography sx={{ fontSize: '14px', color: '#555' }}>
				{block.conferenceIdLabel}{' '}
				<strong style={{ color: '#242424' }}>{block.conferenceId}</strong>
			</Typography>
			<Typography sx={{ fontSize: '14px', color: '#555' }}>
				{block.passwordLabel}{' '}
				<strong style={{ color: '#242424' }}>{block.password}</strong>
			</Typography>
		</Box>

		<Box sx={cardButtonsRowSx}>
			<MUILink
				href={block.zoomUrl}
				target='_blank'
				rel='noopener noreferrer'
				sx={{ width: { xxs: '100%', xs: '100%' }, maxWidth: '304px' }}
			>
				<Button
					variant='contained'
					sx={{
						width: '100%',
						height: '42px',
						borderRadius: 0,
						boxShadow: 'none',
						textTransform: 'none',
					}}
				>
					{block.joinLabel}
				</Button>
			</MUILink>
		</Box>
	</Box>
)

const AccreditationPage = () => {
	const { data } = useTranslationData<AccreditationPageData>('accreditation')

	const [searchQuery, setSearchQuery] = useState('')

	if (!data) {
		return null
	}

	const filteredData = data.data.filter(item =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const handleSearchChange = (query: string) => {
		setSearchQuery(query)
	}

	const handleSearchSubmit = (query: string) => {
		setSearchQuery(query.trim())
	}

	return (
		<Box sx={DocumentCardWrapper}>
			<DocumentTitleSearch
				title={data.title}
				onSearchSubmit={handleSearchSubmit}
				onSearchChange={handleSearchChange}
			/>

			<Box sx={{ maxWidth: '1220px', m: '0px auto' }}>
				<Box sx={DocumentCardAdaptation}>
					{filteredData.map((item, index) => (
						<DocumentCard
							key={index}
							title={item.title}
							link={item.link}
							date={item.date}
						/>
					))}
					{data.visitProgram && (
						<DocumentCard
							key='visit-program'
							title={data.visitProgram.documentTitle}
							link={data.visitProgram.pdfPath}
						/>
					)}
					{data.openMeeting && (
						<OpenMeetingDocumentSquare key='open-meeting' block={data.openMeeting} />
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default AccreditationPage
