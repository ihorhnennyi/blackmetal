import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollToTop() {
	const location = useLocation()
	const navigationType = useNavigationType()
	const positionsRef = useRef<Map<string, number>>(new Map())
	const prevPathRef = useRef<string | null>(null)

	useEffect(() => {
		if ('scrollRestoration' in window.history) {
			const prev = window.history.scrollRestoration
			window.history.scrollRestoration = 'manual'
			return () => {
				window.history.scrollRestoration = prev
			}
		}
	}, [])

	useEffect(() => {
		const currentPath = location.pathname

		if (prevPathRef.current) {
			positionsRef.current.set(prevPathRef.current, window.scrollY)
		}

		const jumpTo = (y: number) => {
			window.scrollTo({ top: y, left: 0, behavior: 'auto' })
			document.documentElement.scrollTop = y
			document.body.scrollTop = y
		}

		jumpTo(0)

		prevPathRef.current = currentPath
	}, [location.pathname, navigationType])

	return null
} 