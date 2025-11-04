import { styled } from '@mui/material'
import { Box } from '@mui/material'

export const NestedDropdownMenu = styled(Box)({
	position: 'absolute',
	top: 0,
	left: '100%',
	zIndex: 1002,
	backgroundColor: '#fff',
	boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
	minWidth: '240px',
})
