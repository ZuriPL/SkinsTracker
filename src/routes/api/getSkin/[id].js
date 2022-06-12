import clientPromise from '../../../lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get({ params }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	const data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	return {
		status: 200,
		body: data.skins[params.id],
	}
}
