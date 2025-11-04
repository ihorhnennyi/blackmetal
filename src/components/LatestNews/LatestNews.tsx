import React, { useEffect, useState } from 'react'
import {
	Box,
	useTheme,
	useMediaQuery,
	IconButton
} from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import LatestNewsElement from './LatestNewsElement'

import { useTranslationData } from '@/hooks/useTranslationData'
import {
	NewsItem,
	TranslatedNewsData,
} from '@pages/HomePage/components/News/NewsTypes'
import DocumentTitleSearch from '../DocumentTitleSearch'

const parseDate = (dateString: string) => {
	const [day, month, year] = dateString.split('.')
	return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

const LatestNews = () => {
	const { i18n } = useTranslation()
	const [latestNews, setLatestNews] = useState<NewsItem[]>([])
	const { data: newsData } = useTranslationData<TranslatedNewsData>('news')
	const [activeStep, setActiveStep] = useState(0)

	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	useEffect(() => {
		if (newsData?.news) {
			const sorted = [...newsData.news]
				.sort(
					(a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
				)
				.slice(0, 4)
				.map(item => ({
					...item,
					imageUrl: Array.isArray(item.imageUrl)
						? item.imageUrl[0]
						: item.imageUrl,
				}))
			setLatestNews(sorted)
		}
	}, [newsData])

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	if (isMobile) {
		return (
			<Box
				sx={{
					width: '100%',
					backgroundColor: '#f8f9fa',
					borderTop: '1px solid #e0e0e0',
					py: 3,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						width: '100%',
						maxWidth: 320,
						position: 'relative',
						px: 2,
					}}
				>
					{latestNews.length > 0 && (
						<Box sx={{ position: 'relative' }}>
							<LatestNewsElement
								title={latestNews[activeStep].title}
								description={latestNews[activeStep].text}
								image={latestNews[activeStep].imageUrl}
								link={`/news/${latestNews[activeStep].id}`}
							/>

							<IconButton
								size='small'
								sx={{
									position: 'absolute',
									left: -50,
									top: '50%',
									transform: 'translateY(-50%)',
									backgroundColor: 'white',
									boxShadow: 2,
									'&:hover': {
										backgroundColor: 'white',
									},
									zIndex: 2,
									width: 32,
									height: 32,
								}}
								onClick={handleBack}
								disabled={activeStep === 0}
							>
								<KeyboardArrowLeft />
							</IconButton>

							<IconButton
								size='small'
								sx={{
									position: 'absolute',
									right: -50,
									top: '50%',
									transform: 'translateY(-50%)',
									backgroundColor: 'white',
									boxShadow: 2,
									'&:hover': {
										backgroundColor: 'white',
									},
									zIndex: 2,
									width: 32,
									height: 32,
								}}
								onClick={handleNext}
								disabled={activeStep === latestNews.length - 1}
							>
								<KeyboardArrowRight />
							</IconButton>
						</Box>
					)}

					<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
						{latestNews.map((_, index) => (
							<Box
								key={index}
								onClick={() => setActiveStep(index)}
								sx={{
									width: 8,
									height: 8,
									borderRadius: '50%',
									backgroundColor:
										index === activeStep
											? theme.palette.primary.main
											: 'rgba(0, 0, 0, 0.2)',
									mx: 0.5,
									cursor: 'pointer',
									transition: 'all 0.2s',
								}}
							/>
						))}
					</Box>
				</Box>
			</Box>
		)
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<DocumentTitleSearch title={`${newsData?.newsTitle}`} search={false} />

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '40px',
					flexWrap: 'wrap',
					mb: '30px',
					borderRight: '1px solid #dfdfdf',
					pr: '50px',
				}}
			>
				{latestNews.map(item => (
					<LatestNewsElement
						key={item.id}
						title={item.title}
						description={item.text}
						image={item.imageUrl}
						link={`/news/${item.id}`}
					/>
				))}
			</Box>
		</Box>
	)
}

export default LatestNews
