import { useEffect, useState, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { loadTranslationData } from '@/i18n/loadTranslations'

export const useTranslationData = <T>(fileName: string) => {
	const { i18n } = useTranslation()
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)
	const isFirstLoad = useRef(true)

	useEffect(() => {
		const loadData = async () => {
			try {
				if (isFirstLoad.current) {
					setLoading(true)
					isFirstLoad.current = false
				}
				setError(null)
				const result = await loadTranslationData<T>(fileName)
				setData(result)
			} catch (err) {
				setError(err as Error)
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [fileName, i18n.language]) 
	
	return useMemo(() => ({ data, loading, error }), [data, loading, error])
}
