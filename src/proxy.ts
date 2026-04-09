import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
	matcher: [
		// Match all pathnames except for internals (_next, api, static files)
		'/((?!_next|api|.*\\..*).*)',
	],
};
