import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme } from './theme'
import Router from '@/router/Router'
import { useTheme } from '@/hooks/useTheme'

function App() {
	const { theme } = useTheme()

	return (
		<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
			<CssBaseline />
			<Router />
		</ThemeProvider>
	)
}

export default App
