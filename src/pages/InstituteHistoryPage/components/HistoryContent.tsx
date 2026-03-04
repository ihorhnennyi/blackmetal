import { Box } from '@mui/material'
import { InstituteHistoryData } from '../types'
import HistoryText from './HistoryText'
import HistoryImage from './HistoryImage'

interface HistoryContentProps {
	data: InstituteHistoryData
}

const HistoryContent = ({ data }: HistoryContentProps) => {
	return (
		<Box>
			<HistoryText>{data.firstParagraph}</HistoryText>
			<HistoryText>{data.secondParagraph}</HistoryText>

			<HistoryImage
				src='/history/history1_2.png'
				alt={data.imageAlt}
				caption={data.imageCaption}
			/>

			<HistoryText>{data.thirdParagraph}</HistoryText>
			<HistoryText>{data.fourthParagraph}</HistoryText>

			<HistoryImage
				src='/history/history2_2.png'
				alt={data.secondImageAlt}
				caption={data.secondImageCaption}
			/>

			<HistoryText>{data.fifthParagraph}</HistoryText>

			<HistoryImage
				src='/history/history3_2.png'
				alt={data.thirdImageAlt}
				caption={data.thirdImageCaption}
			/>

			<HistoryText>{data.sixthParagraph}</HistoryText>
			<HistoryText>{data.seventhParagraph}</HistoryText>
			<HistoryText>{data.eighthParagraph}</HistoryText>

			<HistoryImage
				src='/history/history4_2.png'
				alt={data.fourthImageAlt}
				caption={data.fourthImageCaption}
			/>

			<HistoryText>{data.ninthParagraph}</HistoryText>

			<HistoryImage
				src='/history5.jpg'
				alt={data.fifthImageAlt}
				caption={data.fifthImageCaption}
			/>

			<HistoryText>{data.tenthParagraph}</HistoryText>
			<HistoryText>{data.eleventhParagraph}</HistoryText>
			<HistoryText>{data.twelfthParagraph}</HistoryText>

			<HistoryImage
				src='/history/history6_2.png'
				alt={data.sixthImageAlt}
				caption={data.sixthImageCaption}
			/>

			<HistoryText>{data.thirteenthParagraph}</HistoryText>
			<HistoryText>{data.fourteenthParagraph}</HistoryText>
			<HistoryText>{data.fifteenthParagraph}</HistoryText>
			<HistoryText>{data.sixteenthParagraph}</HistoryText>
			<HistoryText>{data.seventeenthParagraph}</HistoryText>
			<HistoryText>{data.eighteenthParagraph}</HistoryText>
			<HistoryText>{data.nineteenthParagraph}</HistoryText>
			<HistoryText>{data.twentiethParagraph}</HistoryText>
			<HistoryText>{data.twentyFirstParagraph}</HistoryText>
			<HistoryText>{data.twentySecondParagraph}</HistoryText>
			<HistoryText>{data.twentyThirdParagraph}</HistoryText>
			<HistoryText>{data.twentyFourthParagraph}</HistoryText>
			<HistoryText>{data.twentyFifthParagraph}</HistoryText>
			<HistoryText>{data.twentySixthParagraph}</HistoryText>
			<HistoryText>{data.twentySeventhParagraph}</HistoryText>
			<HistoryText>{data.twentyEighthParagraph}</HistoryText>
			<HistoryText>{data.twentyNinthParagraph}</HistoryText>
			<HistoryText>{data.thirtiethParagraph}</HistoryText>
		</Box>
	)
}

export default HistoryContent
