'use client';

import { cn } from '@/lib/utils';
import type { ParticleBackgroundProps } from '@/types/particles';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const ParticleScene = dynamic(() => import('./particles/ParticleScene'), { ssr: false });

const ParticleBackground = memo<ParticleBackgroundProps>(({ className }) => {
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === 'dark';

	return (
		<div className={cn('section-separator pointer-events-none -z-1 overflow-hidden will-change-transform select-none', className)} aria-hidden='true'>
			<ParticleScene isDark={isDark} />
		</div>
	);
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
