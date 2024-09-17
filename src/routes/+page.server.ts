import { error, redirect } from '@sveltejs/kit'

export const load = async () => {
	throw redirect(301, `https://www.figma.com/proto/1HWd5e5hahSpCZ7CdN1s8J/Bit54?page-id=0%3A1&node-id=241-437&node-type=canvas&viewport=275%2C191%2C0.12&t=EDeIU5AuGArE0XFD-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=14%3A618`);
}