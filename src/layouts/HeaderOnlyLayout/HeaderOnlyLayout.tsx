import { Box } from '@mui/material'
import { Header } from '@/components'

interface HeaderOnlyLayoutProps {
	children: React.ReactNode
}

const HeaderOnlyLayout = ({ children }: HeaderOnlyLayoutProps) => {
	return (
		<Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
			<Header />
			<Box component="main" sx={{ flex: 1, overflow: 'hidden' }}>
				{children}
			</Box>
		</Box>
	)
}

export default HeaderOnlyLayout 