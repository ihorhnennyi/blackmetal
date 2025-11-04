import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { useTranslationData } from '@/hooks/useTranslationData'
import {
	NewsItem,
	TranslatedNewsData,
} from '@/pages/HomePage/components/News/NewsTypes'
import {
	NewsHeader,
	NewsContent,
	SimpleNewsContent,
	LoadingState,
	ErrorState,
	useNewsImages,
} from './components'

const NewsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const {
		data: newsData,
		loading,
		error,
	} = useTranslationData<TranslatedNewsData>('news')
	const [newsItem, setNewsItem] = useState<NewsItem | null>(null)

	useEffect(() => {
		if (newsData?.news && id) {
			const foundNews = newsData.news.find(item => item.id === parseInt(id))
			if (foundNews) {
				setNewsItem(foundNews)
			}
		}
	}, [newsData, id])

	if (loading) {
		return <LoadingState />
	}

	if (error || !newsItem) {
		return <ErrorState />
	}

	const images = useNewsImages(newsItem)

	return (
		<Box
			maxWidth='lg'
			sx={{
				pb: '32px',
				px: { xxs: 0, sm: 0 },
				pl: { xxs: 0, md: '50px' },
				maxWidth: '100vw !important',
				overflowX: 'hidden',
			}}
		>
			<NewsHeader title={newsItem.title} date={newsItem.date} />

			{newsItem.content &&
			Array.isArray(newsItem.content) &&
			newsItem.content.length > 0 ? (
				<NewsContent content={newsItem.content} title={newsItem.title} />
			) : (
				<SimpleNewsContent
					images={images}
					title={newsItem.title}
					text={newsItem.text}
				/>
			)}
		</Box>
	)
}

export default NewsPage
