'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types/button';
import NextLink from 'next/link';
import { memo, ReactNode, useMemo } from 'react';

import { ButtonContent } from './Button/ButtonContent';
import { ButtonCenterSvg, ButtonLeftSvg, ButtonRightSvg } from './Button/ButtonShapeSvg';
import { getVariantConfig } from './Button/variants';

// Derive spread types from NextLink/button to stay compatible with exactOptionalPropertyTypes
type LinkRest = Omit<React.ComponentProps<typeof NextLink>, 'href' | 'className' | 'children'> & { to: string };
type ButtonRest = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

const BASE_CLASSES =
	'group/button focus:ring-0 relative inline-flex !h-9 cursor-pointer items-center justify-center !px-[calc(theme(height.9)*21/44)] focus:outline-none disabled:pointer-events-none disabled:brightness-90 sm:!h-11 sm:!px-[calc(theme(height.11)*21/44)] dark:disabled:brightness-90';

const ButtonInner = ({ config, children, loading }: { config: ReturnType<typeof getVariantConfig>; children: ReactNode; loading?: boolean | undefined }) => (
	<>
		<ButtonLeftSvg className={config.leftSvgClass} pathClassName={config.leftPathClass} gradientId={config.leftGradientId} gradientStops={config.leftGradientStops} />
		<span className={config.spanClass}>
			<ButtonContent loading={loading} textClassName={config.textClass}>
				{children}
			</ButtonContent>
			<ButtonCenterSvg
				className={config.centerSvgClass}
				mode={config.centerMode}
				polygonClassName={config.centerPolygonClass}
				gradientId={config.centerGradientId}
				gradientStops={config.centerGradientStops}
				svgFill={config.centerSvgFill}
			/>
		</span>
		<ButtonRightSvg className={config.rightSvgClass} pathClassName={config.rightPathClass} gradientId={config.rightGradientId} gradientStops={config.rightGradientStops} />
	</>
);

export const Button = memo<ButtonProps>((props) => {
	const { className, fill = false, gradient = false, children, loading, ...rest } = props;

	const computedClasses = useMemo(() => {
		const loadingClass = loading ? 'pointer-events-none' : '';
		return cn(BASE_CLASSES, loadingClass, className);
	}, [loading, className]);

	const isLink = 'to' in props && !!props.to;

	const config = useMemo(() => getVariantConfig(fill, gradient, isLink), [fill, gradient, isLink]);

	if (isLink) {
		const { to, ...linkProps } = rest as LinkRest;
		const isExternal = to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:');
		const inner = (
			<ButtonInner config={config} loading={loading}>
				{children}
			</ButtonInner>
		);
		if (isExternal) {
			return (
				<NextLink href={to} className={computedClasses} {...linkProps}>
					{inner}
				</NextLink>
			);
		}
		const { locale: _locale, ...i18nLinkProps } = linkProps;
		return (
			<Link href={to} className={computedClasses} {...i18nLinkProps}>
				{inner}
			</Link>
		);
	}

	const { disabled, ...buttonProps } = rest as ButtonRest;
	return (
		<button className={computedClasses} disabled={disabled} {...buttonProps}>
			<ButtonInner config={config} loading={loading}>
				{children}
			</ButtonInner>
		</button>
	);
});

Button.displayName = 'Button';
