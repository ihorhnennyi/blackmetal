import { FC, useEffect, useRef, useState } from 'react'
import { Box, IconButton, Typography, LinearProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import SendIcon from '@mui/icons-material/Send'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import { PresentationPlayerProps } from './types'

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

const PlayerContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: '680px',
	margin: '0 auto',
	background: '#fff',
	borderRadius: 0,
	overflow: 'hidden',
	boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
	[theme.breakpoints.up('md')]: {
		maxWidth: 'none',
		margin: '0',
	},
}))

const SlideContent = styled(Box)({
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
	width: '100%',
	background: 'transparent',
})

const Canvas = styled('canvas')({
	maxWidth: '100%',
	maxHeight: '100%',
	background: '#fff',
	borderRadius: 4,
})

const ControlsBar = styled(Box)({
	background: '#2D7A84',
	display: 'flex',
	alignItems: 'center',
	height: 48,
	padding: '0 16px',
	gap: 8,
	position: 'relative',
	zIndex: 2,
})

const ProgressBar = styled(LinearProgress)({
	flex: 1,
	height: 6,
	borderRadius: 3,
	background: '#2D7A84',
	'& .MuiLinearProgress-bar': {
		background: '#fff',
	},
})

const PresentationPlayer: FC<PresentationPlayerProps> = ({ pdfUrl }) => {
	const [numPages, setNumPages] = useState(0)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const playerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let pdfDoc: any = null
		setLoading(true)
		pdfjsLib.getDocument(pdfUrl).promise.then((doc: any) => {
			pdfDoc = doc
			setNumPages(doc.numPages)
			setLoading(false)
			renderPage(doc, page)
		})
	}, [pdfUrl])

	useEffect(() => {
		if (numPages > 0) {
			pdfjsLib.getDocument(pdfUrl).promise.then((doc: any) => {
				renderPage(doc, page)
			})
		}
	}, [page, numPages, pdfUrl])

	const renderPage = (doc: any, pageNum: number) => {
		doc.getPage(pageNum).then((pdfPage: any) => {
			const viewport = pdfPage.getViewport({ scale: 1.5, rotation: 0 })
			const canvas = canvasRef.current
			if (!canvas) return
			const context = canvas.getContext('2d')
			canvas.height = viewport.height
			canvas.width = viewport.width
			pdfPage.render({ canvasContext: context, viewport })
		})
	}

	const handlePrev = () => setPage(p => (p > 1 ? p - 1 : numPages))
	const handleNext = () => setPage(p => (p < numPages ? p + 1 : 1))

	const handleFullscreen = () => {
		const elem = playerRef.current
		if (!elem) return
		if (elem.requestFullscreen) {
			elem.requestFullscreen()
		} else if ((elem as any).webkitRequestFullscreen) {
			;(elem as any).webkitRequestFullscreen()
		} else if ((elem as any).msRequestFullscreen) {
			;(elem as any).msRequestFullscreen()
		}
	}

	return (
		<PlayerContainer ref={playerRef}>
			<SlideContent>
				{loading ? (
					<Typography color='#fff'>Загрузка...</Typography>
				) : (
					<Canvas ref={canvasRef} />
				)}
			</SlideContent>
			<ControlsBar>
				<IconButton onClick={handlePrev} sx={{ color: '#fff' }}>
					<ArrowBackIosNewIcon />
				</IconButton>
				<IconButton onClick={handleNext} sx={{ color: '#fff', ml: 0.5 }}>
					<ArrowForwardIosIcon />
				</IconButton>
				<Typography
					sx={{
						color: '#fff',
						minWidth: 32,
						textAlign: 'center',
						fontWeight: 500,
						ml: 2,
					}}
				>
					{page}
				</Typography>
				<ProgressBar
					variant='determinate'
					value={numPages ? (page / numPages) * 100 : 0}
				/>
				<Typography
					sx={{
						color: '#fff',
						minWidth: 32,
						textAlign: 'center',
						fontWeight: 500,
					}}
				>
					{numPages}
				</Typography>
				<IconButton sx={{ color: '#fff' }} onClick={handleFullscreen}>
					<FullscreenIcon />
				</IconButton>
			</ControlsBar>
		</PlayerContainer>
	)
}

export { PresentationPlayer }
export default PresentationPlayer
