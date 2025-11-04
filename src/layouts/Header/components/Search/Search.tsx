import { styled, alpha } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputBase } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useTranslationData } from '@/hooks/useTranslationData'
import { HeaderTranslation } from '../../interface'

const SearchWrapper = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	border: '1px solid #C7C7C7',
	[theme.breakpoints.up('sm')]: {
		width: '378px',
		height: '50px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: '20px',
		paddingRight: '10px',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	right: 0,
	color: '#C7C7C7',
	[theme.breakpoints.up('sm')]: {
		position: 'static',
		pointerEvents: 'auto',
	},
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: '#373737',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 1),
		paddingRight: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			padding: '8px 0',
		},
	},
}))

interface SearchProps {
	searchQuery: string
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onSearchSubmit: (event: React.FormEvent) => void
}

export const Search = ({ searchQuery, onSearchChange, onSearchSubmit }: SearchProps) => {
	const { data: headerData, loading } = useTranslationData<HeaderTranslation>('header')

	if (loading || !headerData) return null

	return (
		<SearchWrapper>
			<form
				onSubmit={onSearchSubmit}
				style={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					position: 'relative',
				}}
			>
				<StyledInputBase
					placeholder={headerData.searchPlaceholder}
					inputProps={{ 'aria-label': 'search' }}
					value={searchQuery}
					onChange={onSearchChange}
				/>
				<SearchIconWrapper>
					<IconButton type='submit' sx={{ color: '#C7C7C7' }}>
						<SearchIcon />
					</IconButton>
				</SearchIconWrapper>
			</form>
		</SearchWrapper>
	)
}
