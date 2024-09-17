import { error, redirect } from '@sveltejs/kit'

export const load = async () => {
	throw redirect(301, `https://tinyurl.com/bit54-demo-link`);
}