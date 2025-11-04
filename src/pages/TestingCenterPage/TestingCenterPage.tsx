import { Box } from '@mui/material'
import { DocumentTitleSearch } from '@/components'
import { useTranslationData } from '@/hooks/useTranslationData'
import {
	TestingCenterHeader,
	TestingCenterContent,
	TestingCenterContacts,
} from './components'
import { DocumentCardProps } from '@/components/DocumentCard/DocumentCardInterface'

interface ContactItem {
	type: string
	value: string
}
interface TestingCenterData {
	title: string
	subtitle: string
	institute: string
	description: string
	tests: string[]
	certification: string
	deputy: string
	deputyName: string
	contacts: ContactItem[]
	documents: DocumentCardProps[]
}

const TestingCenterPage = () => {
	const { data } = useTranslationData<TestingCenterData>('testing-center')

	if (!data) {
		return null
	}

	return (
		<Box
			sx={{
				pb: '30px',
				pl: { xxs: '0px', md: '50px' },
			}}
		>
			<Box sx={{ mt: '32px' }}>
				<TestingCenterHeader
					subtitle={data.subtitle}
					institute={data.institute}
				/>

				<Box
					sx={{
						mb: '32px',
						mt: '16px',
					}}
				>
					<video
						controls
						style={{
							width: '100%',
							height: '60vh',
						}}
						preload='metadata'
						onLoadStart={() => console.log('Video loading started')}
						onLoadedData={() => console.log('Video data loaded')}
						onCanPlay={() => console.log('Video can play')}
						onError={e => {
							console.error('Video error details:', e)
							const videoElement = e.target as HTMLVideoElement
							console.log('Video element:', videoElement)
							console.log('Video src:', videoElement.src)
							console.log('Video error code:', videoElement.error)

							const parent = videoElement.parentElement
							if (parent) {
								parent.innerHTML = `
									<div style="
										padding: 40px; 
										text-align: center; 
										background-color: #f5f5f5;
										min-height: 450px;
										display: flex;
										flex-direction: column;
										justify-content: center;
										align-items: center;
									">
										<a href="/video/file_692.mp4" download style="
											text-decoration: none;
											padding: 10px 20px;
										">
											Завантажити відео
										</a>
									</div>
								`
							}
						}}
					>
						<source src='/video/3.mp4' type='video/mp4' />
						Ваш браузер не поддерживает видео.
					</video>
				</Box>

				<TestingCenterContent
					description={data.description}
					tests={data.tests}
					certification={data.certification}
				/>

				<TestingCenterContacts
					deputy={data.deputy}
					deputyName={data.deputyName}
					contacts={data.contacts}
					documents={data.documents}
				/>
			</Box>
		</Box>
	)
}

export default TestingCenterPage
