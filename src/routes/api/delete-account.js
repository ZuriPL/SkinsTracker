import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'

export async function post({ request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	const data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	let body = await request.json()

	let user = data.users.filter((user) => user.session == request.headers.get('cookie')?.split('=')[1])[0]

	if (user == undefined || !(await bcrypt.compare(body.password, user.password))) {
		return {
			status: 200,
			body: { error: 'Invalid password' },
		}
	}

	let newUsers = data.users.filter((user) => user.session != request.headers.get('cookie')?.split('=')[1])

	await collection.updateOne(
		{ _id: ObjectId('62923f1b36006ed1642ff7d5') },
		{
			$set: { users: newUsers },
		}
	)

	return {
		status: 200,
		body: {
			msg: 'Succesfully deleted account',
		},
	}
}
