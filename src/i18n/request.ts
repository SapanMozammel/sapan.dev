import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Namespace = 'common' | 'navigation' | 'home' | 'blog';

const NAMESPACES: Namespace[] = ['common', 'navigation', 'home', 'blog'];

async function loadNamespace(locale: string, namespace: Namespace): Promise<Record<string, unknown>> {
	try {
		const mod = await import(`./locales/${locale}/${namespace}.json`);
		return mod.default;
	} catch {
		if (locale !== routing.defaultLocale && process.env.NODE_ENV === 'development') {
			console.warn(`[i18n] Missing translation: ${locale}/${namespace}.json — falling back to English`);
		}
		// Always return the English baseline as fallback
		const fallback = await import(`./locales/en/${namespace}.json`);
		return fallback.default;
	}
}

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !routing.locales.includes(locale)) {
		locale = routing.defaultLocale;
	}

	const entries = await Promise.all(NAMESPACES.map(async (ns) => [ns, await loadNamespace(locale, ns)]));

	return {
		locale,
		messages: Object.fromEntries(entries),
	};
});
