import { styled } from '@mui/material'
import { Box } from '@mui/material'

export const DropdownMenu = styled(Box)({
	position: 'absolute',
	top: '100%',
	left: 0,
	zIndex: 1002,
	backgroundColor: '#fff',
	boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
	minWidth: '220px',
	maxWidth: '260px',
})
