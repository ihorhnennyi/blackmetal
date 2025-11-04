import { Card, CardContent } from '@mui/material'

const ContactMap = () => {
  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: '0 4px 20px rgba(45, 122, 132, 0.1)',
        border: `1px solid rgba(45, 122, 132, 0.2)`,
        height: 'fit-content'
      }}
    >
      <CardContent sx={{ p: 0, paddingBottom: '0 !important' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1739.863733821658!2d35.036353707673506!3d48.43867686483877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe337ae2591bd%3A0x93992f126ba0e34f!2z0JjQvdGB0YLQuNGC0YPRgiDRh9GR0YDQvdC-0Lkg0LzQtdGC0LDQu9C70YPRgNCz0LjQuCDQuNC8LiDQly7QmC4g0J3QtdC60YDQsNGB0L7QstCwINCd0JDQnSDQo9C60YDQsNC40L3Riw!5e0!3m2!1sru!2sua!4v1751309445885!5m2!1sru!2sua" 
          style={{
            border: 0, 
            width: '100%', 
            height: '450px',
            display: 'block'
          }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </CardContent>
    </Card>
  )
}

export default ContactMap 