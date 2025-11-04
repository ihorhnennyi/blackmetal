import { Container, Box } from '@mui/material'
import { NewsGrid } from './components/News'
import { HeroSection } from './components/HeroSection'
import universityImage from '../../assets/images/university.png'

const HomePage = () => {
	return (
		<>
			<HeroSection image={universityImage} />
			<Container maxWidth='xl' sx={{ pb: '30px' }}>
				<NewsGrid />
			</Container>
		</>
	)
}

export default HomePage
