import nodemailer from 'nodemailer'

export async function get({ request }) {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'skinstracker@gmail.com',
			pass: process.env['MAILPASS'],
		},
	})
	await transporter.sendMail({
		from: 'Supabase DB lmao',
		to: 'michal.bak222@gmail.com',
		subject: 'Test Succesful',
		html: `
            Supabase Works! ${new Date()}
    	`,
	})

	return {
		status: 200,
		body: {
			response: 'success',
		},
	}
}
