import { serialize } from 'cookie'

export async function get() {
	return {
		status: 302,
		headers: {
			'Set-Cookie': serialize('session', '', {
				path: '/',
				expires: new Date(0),
			}),
			'Cache-Control': 'no-store, no-cache',
			Location: '/login',
		},
		body: 'Succesfully logged out',
	}
}
