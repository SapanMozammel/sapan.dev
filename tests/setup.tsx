/// <reference types="vitest/globals" />
/// <reference types="node" />

// ── Env stubs for `@/lib/env` parse-at-module-load ──
// Must run before any test file imports `@/lib/env*`. Real values come from
// `.env.local` in dev / Vercel dashboard in prod; test runs only need the
// schema to parse cleanly so consumer modules can be exercised.
process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??= 'test-turnstile-site-key';
process.env.RESEND_API_KEY ??= 're_test';
process.env.CONTACT_TO_EMAIL ??= 'test-to@sapan.dev';
process.env.CONTACT_FROM_EMAIL ??= 'test-from@sapan.dev';
process.env.CONTACT_REPLY_TO ??= 'test-reply@sapan.dev';
process.env.UPSTASH_REDIS_REST_URL ??= 'https://test.upstash.io';
process.env.UPSTASH_REDIS_REST_TOKEN ??= 'test-redis-token';
process.env.TURNSTILE_SECRET_KEY ??= 'test-turnstile-secret';

import '@testing-library/jest-dom/vitest';
import React, { type PropsWithChildren } from 'react';

// ── Next.js mocks ──

vi.mock('next/link', () => ({
	default: ({ children, href, ...props }: PropsWithChildren<{ href: string; className?: string }>) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

vi.mock('next/image', () => ({
	// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
	default: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={src} alt={alt} {...props} />,
}));

// ── Theme / i18n mocks ──

vi.mock('next-themes', () => ({
	useTheme: () => ({ theme: 'dark', resolvedTheme: 'dark', setTheme: vi.fn() }),
}));

// Load English messages for test translation (mirrors next-intl at runtime).
const enCommon = await import('../src/i18n/locales/en/common.json').then((m) => m.default);
const enNavigation = await import('../src/i18n/locales/en/navigation.json').then((m) => m.default);
const enHome = await import('../src/i18n/locales/en/home.json').then((m) => m.default);
const enBlog = await import('../src/i18n/locales/en/blog.json').then((m) => m.default);

const MESSAGES: Record<string, unknown> = { common: enCommon, navigation: enNavigation, home: enHome, blog: enBlog };

const getByPath = (obj: unknown, dottedPath: string): unknown => {
	return dottedPath.split('.').reduce<unknown>((acc, part) => {
		if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
			return (acc as Record<string, unknown>)[part];
		}
		return undefined;
	}, obj);
};

const interpolate = (template: string, values?: Record<string, unknown>): string => {
	if (!values) return template;
	return template.replace(/\{(\w+)\}/g, (_, k) => (k in values ? String(values[k]) : `{${k}}`));
};

const makeTranslator =
	(namespace?: string) =>
	(key: string, values?: Record<string, unknown>): string => {
		const fullPath = namespace ? `${namespace}.${key}` : key;
		const value = getByPath(MESSAGES, fullPath);
		return typeof value === 'string' ? interpolate(value, values) : fullPath;
	};

vi.mock('next-intl', () => ({
	useTranslations: (namespace?: string) => makeTranslator(namespace),
	useLocale: () => 'en',
}));

vi.mock('next-intl/server', () => ({
	getTranslations: async (namespace?: string) => makeTranslator(namespace),
	getLocale: async () => 'en',
}));

vi.mock('@/i18n/navigation', () => ({
	usePathname: () => '/',
	useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
	Link: ({ children, href, ...props }: PropsWithChildren<{ href: string; className?: string }>) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

// ── Next.js navigation mock ──

vi.mock('next/navigation', () => ({
	usePathname: () => '/',
	useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), prefetch: vi.fn() }),
}));

// ── Turnstile mock ──

vi.mock('@marsidev/react-turnstile', () => ({
	Turnstile: ({ onSuccess }: { onSuccess?: (token: string) => void }) => {
		// Auto-resolve with a fake token so form submissions are not blocked in tests
		React.useEffect(() => {
			onSuccess?.('test-turnstile-token');
		}, [onSuccess]);
		return <div data-testid='turnstile-widget' />;
	},
}));

// ── Framer Motion mock ──

vi.mock('framer-motion', () => {
	const isMotionValue = (v: unknown): v is { get: () => unknown } => typeof v === 'object' && v !== null && typeof (v as { get?: unknown }).get === 'function';

	const createMotionComponent = (tag: string) => {
		const Comp = React.forwardRef<HTMLElement, PropsWithChildren<Record<string, unknown>>>((props, ref) => {
			const domProps: Record<string, unknown> = {};
			const animationKeys = new Set(['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'whileInView', 'variants']);
			for (const [key, value] of Object.entries(props)) {
				if (animationKeys.has(key)) continue;
				if (key === 'style' && typeof value === 'object' && value !== null) {
					const cleanStyle: Record<string, unknown> = {};
					for (const [styleKey, styleValue] of Object.entries(value as Record<string, unknown>)) {
						cleanStyle[styleKey] = isMotionValue(styleValue) ? styleValue.get() : styleValue;
					}
					domProps[key] = cleanStyle;
					continue;
				}
				domProps[key] = value;
			}
			return React.createElement(tag, { ...domProps, ref });
		});
		Comp.displayName = `motion.${tag}`;
		return Comp;
	};

	const motionProxy = new Proxy({} as Record<string, unknown>, {
		get: (cache, prop: string) => {
			if (!cache[prop]) {
				cache[prop] = createMotionComponent(prop);
			}
			return cache[prop];
		},
	});

	const createMotionValue = (initial: number) => {
		let current = initial;
		return {
			get: () => current,
			set: (v: number) => {
				current = v;
			},
			jump: (v: number) => {
				current = v;
			},
		};
	};

	return {
		motion: motionProxy,
		AnimatePresence: ({ children }: PropsWithChildren) => <>{children}</>,
		useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
		useTransform: () => 0,
		useReducedMotion: () => false,
		useMotionValue: (initial: number) => createMotionValue(initial),
		useSpring: (initial: number) => createMotionValue(typeof initial === 'number' ? initial : 0),
	};
});

// ── GSAP mocks ──

const gsapMock = {
	registerPlugin: vi.fn(),
	set: vi.fn(),
	to: vi.fn(),
	ticker: { add: vi.fn(), remove: vi.fn() },
	context: vi.fn(() => ({ revert: vi.fn() })),
};

vi.mock('gsap', () => ({ default: gsapMock, gsap: gsapMock }));

vi.mock('gsap/ScrollTrigger', () => {
	const st = { create: vi.fn(() => ({ isActive: false, progress: 0, kill: vi.fn() })) };
	return { default: st, ScrollTrigger: st };
});

// ── React Three Fiber mocks ──

vi.mock('@react-three/fiber', () => ({
	Canvas: ({ children }: PropsWithChildren) => <div data-testid='r3f-canvas'>{children}</div>,
	useFrame: vi.fn(),
	extend: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
	useFBO: vi.fn(() => ({ texture: {} })),
	OrthographicCamera: () => null,
}));

// ── Browser API mocks ──

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

class MockIntersectionObserver {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}
Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: MockIntersectionObserver });

class MockResizeObserver {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}
Object.defineProperty(window, 'ResizeObserver', { writable: true, value: MockResizeObserver });
