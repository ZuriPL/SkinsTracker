import { serialize } from 'cookie'
import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get({ request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	const data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	await collection.updateOne(
		{ _id: ObjectId('62923f1b36006ed1642ff7d5'), 'users.session': request.headers.get('cookie')?.split('=')[1] },
		{
			$set: {
				'users.$.session': '',
			},
		}
	)

	return {
		status: 302,
		headers: {
			'Set-Cookie': serialize('session', '', {
				path: '/',
				expires: new Date(0),
			}),
			'Cache-Control': 'no-store, no-cache',
			Location: '/login',
		},
		body: 'Succesfully logged out',
	}
}
