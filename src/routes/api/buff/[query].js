export async function get({ params }) {
	let data = await fetch(`https://buff.163.com/api/market/search/suggest?text=${params.query}&game=csgo`, {
		headers: {
			cookie: import.meta.env.VITE_SESSION,
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
