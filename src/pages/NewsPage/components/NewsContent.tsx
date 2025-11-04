import { Box, Typography, Link as MUILink, List, ListItem } from '@mui/material'
import { NewsContentItem } from '@/pages/HomePage/components/News/NewsTypes'
import { Link } from 'react-router-dom'

interface NewsContentProps {
	content: NewsContentItem[]
	title: string
}

const renderInline = (item: NewsContentItem, index: number) => {
	if (item.type === 'link') {
		return (
			<MUILink
				key={index}
				href={item.href}
				target='_blank'
				rel='noopener noreferrer'
				sx={{
					color: 'primary.main',
					textDecoration: 'none',
					display: 'inline',
				}}
			>
				{item.value}
			</MUILink>
		)
	}

	if (item.type === 'navlink') {
		return (
			<Link
				key={index}
				to={`/person/${item.href}`}
				rel='noopener noreferrer'
				style={{ color: '#2D7A84', textDecoration: 'none', display: 'inline' }}
			>
				{item.value}
			</Link>
		)
	}

	if (item.type === 'bold') {
		return (
			<span
				key={index}
				style={{
					display: 'inline',
					fontWeight: 700,
				}}
			>
				{item.value}
			</span>
		)
	}

	return (
		<span key={index} style={{ display: 'inline' }}>
			{item.value}
		</span>
	)
}

const renderContent = (item: NewsContentItem, index: number) => {
	if (item.type === 'image') {
		return (
			<Box
				key={index}
				sx={{
					maxWidth: '750px',
					width: '100%',
					mx: 'auto',
					mb: 2,
				}}
			>
				<img
					src={item.value}
					alt={`Новость - изображение ${index + 1}`}
					style={{
						maxHeight: '600px',
						width: '100%',
						objectFit: 'contain',
					}}
				/>
			</Box>
		)
	}

	if (item.type === 'desc') {
		return (
			<Typography
				key={index}
				variant='body1'
				sx={{
					mt: -2,
					mb: 2,
					fontSize: '1rem',
					lineHeight: 1.7,
					color: '#333333',
					textAlign: 'center',
					fontStyle: 'italic',
				}}
			>
				{item.value}
			</Typography>
		)
	}

	if (item.type === 'text') {
		if (item.children && item.children.length > 0) {
			return (
				<Typography
					key={index}
					variant='body1'
					sx={{
						fontSize: '1.1rem',
						lineHeight: 1.7,
						color: '#333333',
						mb: 2,
						textAlign: 'justify',
					}}
				>
					{item.children.map((child, idx) => renderInline(child, idx))}
				</Typography>
			)
		}

		return (
			<Typography
				key={index}
				variant='body1'
				sx={{
					fontSize: '1.1rem',
					lineHeight: 1.7,
					color: '#333333',
					mb: 2,
					textAlign: 'justify',
				}}
			>
				{item.value}
			</Typography>
		)
	}

	if (item.type === 'minititle') {
		return (
			<Typography
				key={index}
				variant='body1'
				sx={{
					fontSize: '1.1rem',
					fontWeight: 700,
					lineHeight: 1.7,
					color: '#333333',
					ml: 4,
					mb: 2,
					textAlign: 'justify',
				}}
			>
				{item.value}
			</Typography>
		)
	}

	if (item.type === 'list') {
		return (
			<List
				key={index}
				sx={{
					listStyleType: 'disc',
					pl: 6,
					color: '#333333',
					mb: 2,
				}}
			>
				{item.children?.map((child, idx) => (
					<ListItem
						key={idx}
						sx={{
							display: 'list-item',
							py: 0,
							fontSize: '1.1rem',
							lineHeight: 1.7,
						}}
					>
						{child.children && child.children.length > 0
							? child.children.map((c, i) => renderInline(c, i))
							: child.value}
					</ListItem>
				))}
			</List>
		)
	}

	return null
}

const NewsContent = ({ content }: NewsContentProps) => {
	return (
		<Box sx={{ mb: 3 }}>
			{content.map((item, index) => renderContent(item, index))}
		</Box>
	)
}

export default NewsContent
