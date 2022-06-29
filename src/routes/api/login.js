import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'
import { serialize } from 'cookie'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

export async function post({ request }) {
	const dbConnection = await clientPromise
	const db = dbConnection.db('SkinsTracker')
	const collection = db.collection('SkinsTracker')

	const data = await collection.findOne({ _id: ObjectId('62923f1b36006ed1642ff7d5') })

	let body = await request.json()

	let user = data.users.filter((user) => user.email == body.login)[0]

	if (user == undefined || !(await bcrypt.compare(body.password, user.password))) {
		return {
			status: 200,
			body: { error: 'invalid login or password' },
		}
	}

	let cookie
	if (user.session == '' || user.session == undefined) {
		cookie = uuidv4()
		await collection.updateOne(
			{ _id: ObjectId('62923f1b36006ed1642ff7d5'), 'users.email': body.login },
			{
				$set: {
					'users.$.session': cookie,
				},
			}
		)
	} else {
		cookie = user.session
	}

	user.session = cookie
	console.log(await bcrypt.hash('Kamil22@', 10))

	return {
		status: 200,
		headers: {
			'Set-Cookie': serialize('session', cookie, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7,
			}),
			'Cache-Control': 'no-store, no-cache',
		},
		body: user,
	}
}
