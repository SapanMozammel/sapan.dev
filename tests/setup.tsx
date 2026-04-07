/// <reference types="vitest/globals" />
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

vi.mock('next-intl', () => ({
	useTranslations: () => (key: string) => key,
	useLocale: () => 'en',
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

// ── Framer Motion mock ──

vi.mock('framer-motion', () => {
	const createMotionComponent = (tag: string) => {
		const Comp = React.forwardRef<HTMLElement, PropsWithChildren<Record<string, unknown>>>((props, ref) => {
			const domProps: Record<string, unknown> = {};
			const animationKeys = new Set(['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'whileInView', 'variants']);
			for (const [key, value] of Object.entries(props)) {
				if (!animationKeys.has(key)) {
					domProps[key] = value;
				}
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

	return {
		motion: motionProxy,
		AnimatePresence: ({ children }: PropsWithChildren) => <>{children}</>,
		useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
		useTransform: () => 0,
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
