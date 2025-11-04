import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
const missing = REQUIRED_ENV.filter(k => !process.env[k])
if (missing.length) {
	console.warn(`Missing env vars: ${missing.join(', ')}`)
}

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT || 587),
	secure: Number(process.env.SMTP_PORT) === 465,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
})

app.post('/api/send', async (req, res) => {
	try {
		const { name, phone, email, message } = req.body || {}

		if (!name || !phone || !email || !message) {
			return res.status(400).json({ success: false, message: 'Missing fields' })
		}

		const info = await transporter.sendMail({
			from: `Website Feedback <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
			to: 'isinasukraine@gmail.com',
			subject: 'New feedback message',
			replyTo: email,
			html: `
				<h2>New Feedback</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Phone:</strong> ${phone}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong> ${message}</p>
			`,
		})

		return res.json({ success: true, id: info.messageId })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ success: false, message: 'Send failed' })
	}
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
	console.log(`Mail server listening on :${PORT}`)
}) 