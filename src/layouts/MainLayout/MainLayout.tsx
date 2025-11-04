import { ReactNode } from 'react'
import { Header } from '@/layouts'
import { Footer } from '@/layouts'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import LatestNews from '@/components/LatestNews'
import { useLocation } from 'react-router-dom'
import routes from '@/router/routes.json'

interface MainLayoutProps {
	children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
	const { pathname } = useLocation()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	const showLatest =
		pathname !== routes.HomePage.path && pathname !== routes.ContactsPage.path

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Header />
			<Box
				component='main'
				sx={{
					maxWidth: pathname !== routes.HomePage.path ? 'xxl' : '100%',
					minWidth: 'xxs',
					width: pathname !== routes.HomePage.path ? '90%' : '100%',
					display: 'flex',
					flex: 1,
					m: '0 auto',
					flexDirection: isMobile ? 'column' : 'row',
				}}
			>
				{!isMobile && showLatest && <LatestNews />}
				<Box sx={{ flex: 1 }}>{children}</Box>
				{isMobile && showLatest && <LatestNews />}
			</Box>
			<Footer />
		</Box>
	)
}

export default MainLayout
