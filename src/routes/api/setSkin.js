import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function post({ request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	let data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })
	let body = await request.json()

	await collection.updateOne(
		{ _id: ObjectId('62923f1b36006ed1642ff7d5'), 'users.session': request.headers.get('cookie')?.split('=')[1] },
		{
			$push: {
				'users.$.skins': body.id,
			},
		}
	)

	if (data.skins[body.id] == undefined) {
		let updateVal = {}
		updateVal[`skins.${body.id}`] = { name: body.name }

		await collection.updateOne(
			{ _id: ObjectId('62923f1b36006ed1642ff7d5') },
			{
				$set: updateVal,
			}
		)
	}

	data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })
	let user = data.users.filter((user) => user.session == request.headers.get('cookie')?.split('=')[1])[0]

	return {
		status: 200,
		body: user,
	}
}

export async function del({ request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	let data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })
	let body = await request.json()

	await collection.updateOne(
		{ _id: ObjectId('62923f1b36006ed1642ff7d5'), 'users.session': request.headers.get('cookie')?.split('=')[1] },
		{
			$pull: {
				'users.$.skins': body.id,
			},
		}
	)

	data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })
	let user = data.users.filter((user) => user.session == request.headers.get('cookie')?.split('=')[1])[0]

	return {
		status: 200,
		body: user,
	}
}
