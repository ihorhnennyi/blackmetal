import { Box } from '@mui/material'
import StrategyDirection from './StrategyDirection'

interface StrategyDirectionsListProps {
  directions: string[]
}

const StrategyDirectionsList = ({ directions }: StrategyDirectionsListProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {directions.map((direction, index) => (
        <StrategyDirection 
          key={index} 
          text={direction} 
          index={index} 
        />
      ))}
    </Box>
  )
}

export default StrategyDirectionsList 