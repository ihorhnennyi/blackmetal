import { NewsItem } from '@/pages/HomePage/components/News/NewsTypes'

export const useNewsImages = (newsItem: NewsItem | null): string[] => {
  if (!newsItem) return []

  if (Array.isArray(newsItem.images) && newsItem.images.length > 0) {
    return newsItem.images
  } else if (Array.isArray(newsItem.imageUrl)) {
    return newsItem.imageUrl
  } else if (typeof newsItem.imageUrl === 'string') {
    return [newsItem.imageUrl]
  }

  return []
} 