export const CommonCardStyles = {
	base: {
		display: 'flex',
		backgroundColor: '#FFFFFF',
		boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
		borderRadius: 0,
		overflow: 'hidden',
	},
	
	adaptive: {
		display: 'grid',
		gap: '25px',
		justifyContent: 'center',
		'@media (max-width: 768px)': {
			gridTemplateColumns: '1fr',
		},
	},
	
	content: {
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
	},
	
	image: {
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
} as const

export const GridAdaptations = {
	personCard: {
		display: 'grid',
		gap: '25px',
		justifyContent: 'center',
		gridTemplateColumns: 'repeat(auto-fit, 589px)',
		'@media (max-width: 768px)': {
			gridTemplateColumns: '1fr',
		},
	},
	
	documentCard: {
		display: 'grid',
		gap: '25px',
		gridTemplateColumns: {
			xxs: '1fr',
			xs: 'repeat(auto-fit, 390px)',
		},
		justifyContent: 'center',
	},
	
	monoCard: {
		display: 'grid',
		gap: '25px',
		gridTemplateColumns: {
			xxs: '1fr',
			md: 'repeat(auto-fit, 600px)',
		},
		justifyContent: 'center',
	},
} as const

export const CommonButtonStyles = {
	primary: {
		backgroundColor: '#2D7A84',
		color: '#FFFFFF',
		textTransform: 'none',
		borderRadius: 0,
		'&:hover': {
			backgroundColor: '#1f5a60',
		},
	},
	
	iconButton: {
		padding: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 1)',
		},
	},
	
	navigationButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		border: `1px solid #e0e0e0`,
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 1)',
		},
	},
} as const

export const CommonTextStyles = {
	title: {
		fontSize: '22px',
		fontWeight: 700,
		lineHeight: 1.2,
		color: '#000000',
	},
	
	subtitle: {
		fontSize: '18px',
		fontWeight: 700,
		lineHeight: 1.4,
		color: '#333333',
		textAlign: 'center',
	},
	
	body: {
		fontSize: '16px',
		fontWeight: 400,
		lineHeight: 1.6,
		color: '#333333',
	},
	
	caption: {
		fontSize: '13px',
		fontWeight: 400,
		color: '#707070',
	},
	
	position: {
		fontSize: '14px',
		fontWeight: 400,
		color: '#8A8A8A',
	},
} as const

export const CommonLayoutStyles = {
	wrapper: {
		pl: { xxs: '0px', md: '50px' },
		pb: '30px',
	},
	
	section: {
		mb: 3,
	},
	
	flexCenter: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	flexBetween: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
} as const

export const CommonInputStyles = {
	search: {
		border: `1px solid #DFDFDF`,
		backgroundColor: '#FFFFFF',
		borderRadius: 0,
		'&:focus': {
			borderColor: '#2D7A84',
		},
	},
} as const

export type CommonStylesType = {
	CardStyles: typeof CommonCardStyles
	GridAdaptations: typeof GridAdaptations
	ButtonStyles: typeof CommonButtonStyles
	TextStyles: typeof CommonTextStyles
	LayoutStyles: typeof CommonLayoutStyles
	InputStyles: typeof CommonInputStyles
} 