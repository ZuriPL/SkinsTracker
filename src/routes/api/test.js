import { serialize } from 'cookie'
import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get({ request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	const data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	// await collection.updateOne(
	// 	{ _id: ObjectId('62923f1b36006ed1642ff7d5'), 'users.session': cookie },
	// 	{
	// 		$set: {
	// 			'users.$.session': '',
	// 		},
	// 	}
	// )

	return {
		status: 200,
		body: request.headers.get('cookie'),
	}
}
