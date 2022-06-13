import dotenv from 'dotenv'
dotenv.config()

export async function get({ params }) {
	let data = await fetch(`https://buff.163.com/api/market/search/suggest?text=${params.query}&game=csgo`, {
		headers: {
			cookie: process.env['SESSION'],
		},
		credentials: 'include',
		mode: 'cors',
	})
	let response = await data.json()

	return {
		status: 200,
		body: {
			res: response,
		},
	}
}
