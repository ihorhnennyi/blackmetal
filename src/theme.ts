import { createTheme } from '@mui/material/styles'

const breakpoints = {
	values: {
		xxs: 0,
		xs: 481,
		sm: 769,
		md: 1025,
		lg: 1281,
		xl: 1441,
		xxl: 1921,
		хххl: 2561,
	},
}

const commonThemeConfig = {
	breakpoints,
	shape: {
		borderRadius: 0,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 0,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 0,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 0,
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 0,
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					borderRadius: 0,
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 0,
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						borderRadius: 0,
					},
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					borderRadius: 0,
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					borderRadius: 0,
				},
			},
		},
	},
}

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: { main: '#2D7A84' },
		background: { default: '#f8f8f8', paper: '#fff' },
	},
	breakpoints,
})

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#90caf9' },
		background: { default: '#121212', paper: '#1e1e1e' },
	},
	...commonThemeConfig,
})
