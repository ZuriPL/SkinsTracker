import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export async function get({ request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	const data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	let user = data.users.filter((user) => user.session == request.headers.get('cookie')?.split('=')[1])[0]

	let code = Math.round(Math.random() * 999999)

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'skinstracker@gmail.com',
			pass: process.env['MAILPASS'],
		},
	})

	await transporter.sendMail({
		from: 'SkinsTracker',
		to: user.email,
		subject: 'Password Recovery Code',
		html: `
            <p>Your recovery code is: <strong>${code}</strong>. This code will expire in <strong>15 minutes</strong></p>
        `,
	})

	await collection.updateOne(
		{ _id: ObjectId('62923f1b36006ed1642ff7d5'), 'users.session': request.headers.get('cookie')?.split('=')[1] },
		{
			$set: {
				'users.$.recovery': {
					code,
					expire: new Date(Date.now() + 15 * 60000),
				},
			},
		}
	)

	return {
		status: 200,
	}
}
