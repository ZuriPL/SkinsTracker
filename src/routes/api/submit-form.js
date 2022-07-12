import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export async function post({ request }) {
	let body = await request.json()

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'skinstracker@gmail.com',
			pass: process.env['MAILPASS'],
		},
	})

	await transporter.sendMail({
		from: 'SkinsTracker',
		to: body.email,
		subject: 'Help Ticket',
		html: `
            <p><strong>Below is a copy of your help request message. If you want to add or correct something, reply to this email. Also reply if you didn't recieve an answer in 24 hours.</strong></p>
            <hr />
            <div>
                <h1>${body.title}</h1>
                <p style="font-size: 1.1rem;">${body.content}</p>
            </div>
            `,
	})

	await transporter.sendMail({
		from: 'SkinsTracker',
		to: 'michal.bak222@gmail.com',
		subject: 'New Ticket',
		html: `
            New ticket from ${body.email}
            `,
	})

	return {
		status: 200,
	}
}
