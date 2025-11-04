import { DocumentTitleSearch } from '@/components'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const ProcurementPage = () => {
	const { t } = useTranslation()
	return (
		<Box
			sx={{
				height: '100%',
				pl: { xxs: '0px', md: '50px' },
				pb: '30px',
			}}
		>
			<DocumentTitleSearch title={t('routes.ProcurementPage')} search={false} />
			<Box sx={{ height: 'calc(100% - 96px)' }}>
				<iframe
					src='//my.zakupki.prom.ua/remote/widget/state_purchase_iframe/7b16d220-9546-4d3d-9a84-57683f9f97a7?locale=uk&amp;srn=00190294'
					style={{ width: '100%', height: '100%', border: 'none' }}
				></iframe>
			</Box>
		</Box>
	)
}

export default ProcurementPage
