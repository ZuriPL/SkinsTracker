import clientPromise from '../../../lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get({ params, request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	let data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	await collection.updateOne(
		{ _id: ObjectId('62923f1b36006ed1642ff7d5'), 'users.session': request.headers.get('cookie')?.split('=')[1] },
		{
			$push: {
				'users.$.skins': params.id,
			},
		}
	)

	let updateVal = {}
	updateVal[`skins.${params.id}`] = { name: params.name }

	await collection.updateOne(
		{ _id: ObjectId('62923f1b36006ed1642ff7d5') },
		{
			$set: updateVal,
		}
	)

	data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })
	let user = data.users.filter((user) => user.session == request.headers.get('cookie')?.split('=')[1])[0]

	return {
		status: 200,
		body: user,
	}
}
export async function del({ params, request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	let data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	await collection.updateOne(
		{ _id: ObjectId('62923f1b36006ed1642ff7d5'), 'users.session': request.headers.get('cookie')?.split('=')[1] },
		{
			$push: {
				'users.$.skins': '123',
			},
		}
	)

	let updateVal = {}
	updateVal[params.id] = params.name

	await collection.updateOne(
		{ _id: ObjectId('629bce175ac2a65a136f6497') },
		{
			$set: {
				updateVal,
			},
		}
	)

	data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })
	let user = data.users.filter((user) => user.session == request.headers.get('cookie')?.split('=')[1])[0]

	return {
		status: 200,
		body: params,
	}
}
