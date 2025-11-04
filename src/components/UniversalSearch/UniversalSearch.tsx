import React from 'react'
import { InputBase, IconButton, Box, SxProps, Theme } from '@mui/material'
import SearchIcon from '/search.svg'

interface UniversalSearchProps {
	placeholderKey?: string
	onSearch: (query: string) => void
	onChange?: (query: string) => void
	sx?: SxProps<Theme>
	isExpanded?: boolean
	onFocus?: () => void
	onBlur?: () => void
}

const UniversalSearch: React.FC<UniversalSearchProps> = ({
	placeholderKey,
	onSearch,
	onChange,
	sx,
	isExpanded = true,
	onFocus,
	onBlur,
}) => {
	const [query, setQuery] = React.useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSearch(query.trim())
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value
		setQuery(newQuery)
		onChange?.(newQuery)
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			sx={{
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
				...sx,
			}}
		>
			<InputBase
				value={query}
				onChange={handleChange}
				placeholder={placeholderKey}
				onFocus={onFocus}
				onBlur={onBlur}
				sx={{
					ml: 1,
					mr: 6,
					flex: 1,
					transition: 'all 0.5s ease-in-out',
					opacity: isExpanded ? 1 : 0,
					width: isExpanded ? '100%' : '0px',
					visibility: isExpanded ? 'visible' : 'hidden',
					transform: isExpanded ? 'scaleX(1)' : 'scaleX(0)',
					transformOrigin: 'left',
				}}
			/>
			<IconButton
				type='submit'
				sx={{
					p: 3,
					position: 'absolute',
					right: 0,
					transition: 'transform 0.3s ease',
					'&:hover': {
						transform: 'scale(1.1)',
					},
				}}
			>
				<img src={SearchIcon} alt='icon' style={{ paddingLeft: 3 }} />
			</IconButton>
		</Box>
	)
}

export default UniversalSearch
