import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

export async function post({ request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	const data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	let body = await request.json()

	let user = data.users.filter((user) => user.email == body.login)[0]

	if (user != undefined) {
		return {
			status: 200,
			body: { error: 'user already exists' },
		}
	}

	let newUser = {
		email: body.login,
		password: await bcrypt.hash(body.password, 10),
		skins: [],
	}

	await collection.updateOne(
		{ _id: ObjectId('62923f1b36006ed1642ff7d5') },
		{
			$push: { users: newUser },
		}
	)

	return {
		status: 200,
		body: { msg: 'Succesfully created a user' },
	}
}
