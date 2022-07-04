import clientPromise from '../../lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get({ request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	const data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	let user = data.users.filter((user) => user.session == request.headers.get('cookie')?.split('=')[1])[0]

	console.log(user)

	if (user == undefined) {
		return {
			status: 200,
			body: { msg: 'cookie invalid' },
		}
	}

	return {
		status: 200,
		body: { msg: 'cookie valid' },
	}
}
