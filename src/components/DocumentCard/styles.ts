import { SxProps } from '@mui/material'

export const DocumentCardAdaptation: SxProps = {
	display: 'grid',
	gap: '25px',
	gridTemplateColumns: {
		xxs: '1fr',
		xs: 'repeat(auto-fit, 390px)',
	},
	justifyContent: 'center',
}

export const DocumentCardWrapper: SxProps = {
	pl: { xxs: '0px', md: '50px' },
	pb: '30px',
}
