import { FC, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DocumentTitleSearch } from '@/components'
import {
	Grid,
	CircularProgress,
	Box,
	useTheme,
	useMediaQuery,
} from '@mui/material'
import { NewsCard } from './NewsCard'
import { NewsItem, TranslatedNewsData } from './NewsTypes'
import { Pagination } from '@/components/Pagination/Pagination'
import { useTranslationData } from '@/hooks/useTranslationData'

const parseDate = (dateString: string) => {
	const [day, month, year] = dateString.split('.')
	return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

export const NewsGrid: FC = () => {
	const navigate = useNavigate()
	const { data: translationData, loading } = useTranslationData<TranslatedNewsData>('news')

	const [news, setNews] = useState<NewsItem[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const newsTitleRef = useRef<HTMLDivElement>(null)

	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
	const isTablet = useMediaQuery(theme.breakpoints.down('md'))

	const ITEMS_PER_PAGE = isMobile ? 4 : isTablet ? 4 : 6

	useEffect(() => {
		if (translationData?.news) {
			const sorted = [...translationData.news].sort(
				(a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
			)

			const loadedNews = sorted.map(item => ({
				...item,
				imageUrl: Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl,
				onClick: () => navigate(`/news/${item.id}`),
			}))

			setNews(loadedNews)
		}
	}, [translationData, navigate])

	useEffect(() => {
		const totalPages = Math.max(1, Math.ceil(news.length / ITEMS_PER_PAGE))
		const clamped = Math.min(Math.max(currentPage, 1), totalPages)
		if (clamped !== currentPage) {
			setCurrentPage(clamped)
		}
	}, [news.length, ITEMS_PER_PAGE, currentPage])

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		if ((isMobile || isTablet) && newsTitleRef.current) {
			newsTitleRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		}
	}

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const displayedNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE)

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', py: 4, width: '100%' }}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<DocumentTitleSearch 
				ref={newsTitleRef}
				title={`${translationData?.newsTitle}`} 
				search={false} 
			/>

			<Grid 
				container 
				spacing={{ xs: 3, sm: 4, md: 5 }} 
				sx={{ mb: { xs: 3, sm: 4, md: 5 } }}
			>
				{displayedNews.map((item, idx) => (
					<Grid
						item
						key={item.id}
						xs={12}
						sm={6}
						sx={{
							mb: {
								xxs: 2,
								xs: 0,
							},
						}}
						component={'div' as React.ElementType}
					>
						<NewsCard {...item} />
					</Grid>
				))}
			</Grid>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					mt: { xs: 2, sm: 3, md: 4 },
				}}
			>
				<Pagination
					totalItems={news.length}
					itemsPerPage={ITEMS_PER_PAGE}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					siblingCount={isMobile ? 0 : 1}
				/>
			</Box>
		</Box>
	)
}