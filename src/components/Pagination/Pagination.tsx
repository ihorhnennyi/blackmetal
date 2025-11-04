import { FC } from 'react'
import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PaginationProps } from './types'
import { usePagination } from './usePagination'

const PaginationContainer = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '0.5rem',
	marginTop: '2rem',
})

const PageButton = styled(Button)(({ theme }) => ({
	minWidth: '40px',
	height: '40px',
	padding: '0',
	color: theme.palette.primary.main,
	borderColor: theme.palette.primary.main,
	borderRadius: 0,
	'&.active': {
		backgroundColor: theme.palette.primary.main,
		color: '#fff',
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		},
	},
	'&:hover': {
		borderColor: theme.palette.primary.dark,
		backgroundColor: 'rgba(20, 41, 52, 0.04)',
	},
}))

const Ellipsis = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '40px',
	height: '40px',
	color: theme.palette.primary.main,
}))

export const Pagination: FC<PaginationProps> = ({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
	siblingCount = 1,
}) => {
	const paginationRange = usePagination({
		totalItems,
		itemsPerPage,
		currentPage,
		siblingCount,
	})

	if (currentPage === 0 || paginationRange.length < 2) {
		return null
	}

	const onNext = () => {
		onPageChange(currentPage + 1)
	}

	const onPrevious = () => {
		onPageChange(currentPage - 1)
	}

	const lastPage = paginationRange[paginationRange.length - 1].value as number

	return (
		<PaginationContainer>
			<PageButton variant='outlined' onClick={onPrevious} disabled={currentPage === 1}>
				{'<'}
			</PageButton>

			{paginationRange.map((pageNumber, index) => {
				if (pageNumber.type === 'ellipsis') {
					return <Ellipsis key={`ellipsis-${index}`}>{pageNumber.value}</Ellipsis>
				}

				return (
					<PageButton
						key={pageNumber.value}
						variant='outlined'
						onClick={() => onPageChange(pageNumber.value as number)}
						className={
							pageNumber.type === 'page' && 'isActive' in pageNumber && pageNumber.isActive
								? 'active'
								: ''
						}
					>
						{pageNumber.value}
					</PageButton>
				)
			})}

			<PageButton variant='outlined' onClick={onNext} disabled={currentPage === lastPage}>
				{'>'}
			</PageButton>
		</PaginationContainer>
	)
}
