import type { ButtonVariantConfig, GradientStop } from '@/types/button';

const GRADIENT_SVG_CLASS = 'group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0';
const CENTER_SVG_CLASS = 'absolute top-0 h-full w-full';

const INFO_STOPS: GradientStop[] = [
	{ offset: '0%', stopColor: 'var(--color-info)' },
	{ offset: '100%', stopColor: 'var(--color-info)' },
];

const PRIMARY_STOPS: GradientStop[] = [
	{ offset: '0%', stopColor: 'var(--color-primary)' },
	{ offset: '100%', stopColor: 'var(--color-primary)' },
];

const CENTER_GRADIENT_STOPS: GradientStop[] = [
	{ offset: '0%', stopColor: 'var(--color-info)' },
	{ offset: '100%', stopColor: 'var(--color-primary)' },
];

// ── Link + Fill + Gradient ──
const LINK_FILL_GRADIENT: ButtonVariantConfig = {
	leftSvgClass: `absolute inset-y-0 left-0 aspect-21/44 h-full ${GRADIENT_SVG_CLASS}`,
	leftPathClass: 'fill-[url(#btn-left-link-filled)] stroke-[url(#btn-left-link-filled)] duration-150',
	leftGradientId: 'btn-left-link-filled',
	leftGradientStops: INFO_STOPS,
	spanClass: `relative h-full grow ${GRADIENT_SVG_CLASS}`,
	textClass: 'font-hg relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider text-white uppercase group-hover/button:text-white sm:text-sm dark:text-white',
	centerMode: 'fill',
	centerSvgClass: CENTER_SVG_CLASS,
	centerPolygonClass: 'fill-[url(#btn-center-link-filled)] duration-150',
	centerGradientId: 'btn-center-link-filled',
	centerGradientStops: CENTER_GRADIENT_STOPS,
	rightSvgClass: `absolute inset-y-0 right-0 aspect-21/44 h-full ${GRADIENT_SVG_CLASS}`,
	rightPathClass: 'fill-[url(#btn-right-link-filled)] stroke-[url(#btn-right-link-filled)] duration-150',
	rightGradientId: 'btn-right-link-filled',
	rightGradientStops: PRIMARY_STOPS,
};

// ── Link + Fill + Solid ──
const LINK_FILL_SOLID: ButtonVariantConfig = {
	leftSvgClass: 'absolute inset-y-0 left-0 aspect-21/44 h-full',
	leftPathClass:
		'fill-dark stroke-dark group-hover/button:fill-primary group-hover/button:stroke-primary dark:group-hover/button:fill-success dark:group-hover/button:stroke-success duration-150 dark:fill-white dark:stroke-white',
	spanClass: 'relative h-full grow',
	textClass:
		'font-hg dark:text-dark dark:group-hover/button:text-dark relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider text-white uppercase group-hover/button:text-white sm:text-sm',
	centerMode: 'fill',
	centerSvgClass: CENTER_SVG_CLASS,
	centerPolygonClass: 'fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success duration-150 dark:fill-white',
	rightSvgClass: 'absolute inset-y-0 right-0 aspect-21/44 h-full',
	rightPathClass:
		'fill-dark stroke-dark group-hover/button:fill-primary group-hover/button:stroke-primary dark:group-hover/button:fill-success dark:group-hover/button:stroke-success duration-150 dark:fill-white dark:stroke-white',
};

// ── Link + Outline + Gradient ──
const LINK_OUTLINE_GRADIENT: ButtonVariantConfig = {
	leftSvgClass: `absolute inset-y-0 left-0 aspect-21/44 h-full ${GRADIENT_SVG_CLASS}`,
	leftPathClass: 'fill-none stroke-[url(#btn-left-link)]',
	leftGradientId: 'btn-left-link',
	leftGradientStops: INFO_STOPS,
	spanClass: `relative h-full grow ${GRADIENT_SVG_CLASS}`,
	textClass: 'font-hg text-dark relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider uppercase sm:text-sm dark:text-white',
	centerMode: 'stroke',
	centerSvgClass: CENTER_SVG_CLASS,
	centerPolygonClass: 'fill-[url(#btn-center-link)]',
	centerGradientId: 'btn-center-link',
	centerGradientStops: CENTER_GRADIENT_STOPS,
	centerSvgFill: 'none',
	rightSvgClass: `absolute inset-y-0 right-0 aspect-21/44 h-full ${GRADIENT_SVG_CLASS}`,
	rightPathClass: 'fill-none stroke-[url(#btn-right-link)]',
	rightGradientId: 'btn-right-link',
	rightGradientStops: PRIMARY_STOPS,
};

// ── Link + Outline + Solid ──
const LINK_OUTLINE_SOLID: ButtonVariantConfig = {
	leftSvgClass: 'absolute inset-y-0 left-0 aspect-21/44 h-full',
	leftPathClass: 'stroke-dark group-hover/button:stroke-primary dark:group-hover/button:stroke-success fill-none dark:stroke-white',
	spanClass: 'relative h-full grow',
	textClass:
		'font-hg text-dark group-hover/button:text-primary dark:group-hover/button:text-success relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider uppercase sm:text-sm dark:text-white',
	centerMode: 'stroke',
	centerSvgClass: CENTER_SVG_CLASS,
	centerPolygonClass: 'fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success dark:fill-white',
	centerSvgFill: 'none',
	rightSvgClass: 'absolute inset-y-0 right-0 aspect-21/44 h-full',
	rightPathClass: 'stroke-dark group-hover/button:stroke-primary dark:group-hover/button:stroke-success fill-none dark:stroke-white',
};

// ── Button + Fill + Gradient ──
const BUTTON_FILL_GRADIENT: ButtonVariantConfig = {
	leftSvgClass: `absolute inset-y-0 left-0 aspect-21/44 h-full ${GRADIENT_SVG_CLASS}`,
	leftPathClass: 'group-disabled/button:fill-secondary-300 group-disabled/button:stroke-secondary-300 fill-[url(#btn-left-filled)] stroke-[url(#btn-left-filled)] duration-150',
	leftGradientId: 'btn-left-filled',
	leftGradientStops: INFO_STOPS,
	spanClass: `relative h-full grow ${GRADIENT_SVG_CLASS}`,
	textClass:
		'font-hg group-disabled/button:text-secondary-500 relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider text-white uppercase group-hover/button:text-white sm:text-sm dark:text-white',
	centerMode: 'fill',
	centerSvgClass: CENTER_SVG_CLASS,
	centerPolygonClass: 'group-disabled/button:fill-secondary-300 fill-[url(#btn-center-filled)] duration-150',
	centerGradientId: 'btn-center-filled',
	centerGradientStops: CENTER_GRADIENT_STOPS,
	rightSvgClass: `absolute inset-y-0 right-0 aspect-21/44 h-full ${GRADIENT_SVG_CLASS}`,
	rightPathClass: 'group-disabled/button:fill-secondary-300 group-disabled/button:stroke-secondary-300 fill-[url(#btn-right-filled)] stroke-[url(#btn-right-filled)] duration-150',
	rightGradientId: 'btn-right-filled',
	rightGradientStops: PRIMARY_STOPS,
};

// ── Button + Fill + Solid ──
const BUTTON_FILL_SOLID: ButtonVariantConfig = {
	leftSvgClass: 'absolute inset-y-0 left-0 aspect-21/44 h-full',
	leftPathClass:
		'fill-dark stroke-dark group-hover/button:fill-primary group-hover/button:stroke-primary dark:group-hover/button:fill-success dark:group-hover/button:stroke-success group-disabled/button:fill-secondary-300 group-disabled/button:stroke-secondary-300 duration-150 dark:fill-white dark:stroke-white',
	spanClass: 'relative h-full grow',
	textClass:
		'font-hg dark:text-dark group-disabled/button:text-secondary-500 dark:group-hover/button:text-dark relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider text-white uppercase group-hover/button:text-white sm:text-sm',
	centerMode: 'fill',
	centerSvgClass: CENTER_SVG_CLASS,
	centerPolygonClass: 'fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success group-disabled/button:fill-secondary-300 duration-150 dark:fill-white',
	rightSvgClass: 'absolute inset-y-0 right-0 aspect-21/44 h-full',
	rightPathClass:
		'fill-dark stroke-dark group-hover/button:fill-primary group-hover/button:stroke-primary dark:group-hover/button:fill-success dark:group-hover/button:stroke-success group-disabled/button:fill-secondary-300 group-disabled/button:stroke-secondary-300 duration-150 dark:fill-white dark:stroke-white',
};

// ── Button + Outline + Gradient ──
const BUTTON_OUTLINE_GRADIENT: ButtonVariantConfig = {
	leftSvgClass: `absolute inset-y-0 left-0 aspect-21/44 h-full ${GRADIENT_SVG_CLASS}`,
	leftPathClass: 'group-disabled/button:stroke-secondary-300 fill-none stroke-[url(#btn-left)]',
	leftGradientId: 'btn-left',
	leftGradientStops: INFO_STOPS,
	spanClass: `relative h-full grow ${GRADIENT_SVG_CLASS}`,
	textClass:
		'font-hg text-dark group-disabled/button:text-secondary-400 relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider uppercase sm:text-sm dark:text-white',
	centerMode: 'stroke',
	centerSvgClass: CENTER_SVG_CLASS,
	centerPolygonClass: 'group-disabled/button:fill-secondary-300 fill-[url(#btn-center)]',
	centerGradientId: 'btn-center',
	centerGradientStops: CENTER_GRADIENT_STOPS,
	centerSvgFill: 'none',
	rightSvgClass: `absolute inset-y-0 right-0 aspect-21/44 h-full ${GRADIENT_SVG_CLASS}`,
	rightPathClass: 'group-disabled/button:stroke-secondary-300 fill-none stroke-[url(#btn-right)]',
	rightGradientId: 'btn-right',
	rightGradientStops: PRIMARY_STOPS,
};

// ── Button + Outline + Solid ──
const BUTTON_OUTLINE_SOLID: ButtonVariantConfig = {
	leftSvgClass: 'absolute inset-y-0 left-0 aspect-21/44 h-full',
	leftPathClass: 'group-disabled/button:stroke-secondary-300 stroke-dark group-hover/button:stroke-primary dark:group-hover/button:stroke-success fill-none dark:stroke-white',
	spanClass: 'relative h-full grow',
	textClass:
		'font-hg text-dark group-disabled/button:text-secondary-400 group-hover/button:text-primary dark:group-hover/button:text-success relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider uppercase sm:text-sm dark:text-white',
	centerMode: 'stroke',
	centerSvgClass: CENTER_SVG_CLASS,
	centerPolygonClass: 'group-disabled/button:fill-secondary-300 fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success dark:fill-white',
	centerSvgFill: 'none',
	rightSvgClass: 'absolute inset-y-0 right-0 aspect-21/44 h-full',
	rightPathClass: 'group-disabled/button:stroke-secondary-300 stroke-dark group-hover/button:stroke-primary dark:group-hover/button:stroke-success fill-none dark:stroke-white',
};

// Lookup table — all class strings above are fully static, Tailwind-safe
const VARIANT_MAP = {
	'link-fill-gradient': LINK_FILL_GRADIENT,
	'link-fill-solid': LINK_FILL_SOLID,
	'link-outline-gradient': LINK_OUTLINE_GRADIENT,
	'link-outline-solid': LINK_OUTLINE_SOLID,
	'button-fill-gradient': BUTTON_FILL_GRADIENT,
	'button-fill-solid': BUTTON_FILL_SOLID,
	'button-outline-gradient': BUTTON_OUTLINE_GRADIENT,
	'button-outline-solid': BUTTON_OUTLINE_SOLID,
} as const;

export const getVariantConfig = (fill: boolean, gradient: boolean, isLink: boolean): ButtonVariantConfig => {
	const element = isLink ? 'link' : 'button';
	const mode = fill ? 'fill' : 'outline';
	const style = gradient ? 'gradient' : 'solid';
	const key = `${element}-${mode}-${style}` as keyof typeof VARIANT_MAP;
	return VARIANT_MAP[key];
};
