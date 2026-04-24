'use client';

import { cn } from '@/lib/utils';
import type { ParticleBackgroundProps } from '@/types/particles';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';

const ParticleScene = dynamic(() => import('./particles/ParticleScene'), { ssr: false });

// Probe once at mount: WebGL 2 guarantees half-float render-target support in the core spec.
// Devices without WebGL 2 (old iOS, low-end Android) fall back to the CSS glow.
const supportsHalfFloatFBO = (): boolean => {
	if (typeof window === 'undefined') return false;
	try {
		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl2');
		if (gl) return true;
		const gl1 = canvas.getContext('webgl');
		if (!gl1) return false;
		return Boolean(gl1.getExtension('OES_texture_half_float') && gl1.getExtension('EXT_color_buffer_half_float'));
	} catch {
		return false;
	}
};

const ParticleFallback = memo(() => <div aria-hidden className='glow-blob-primary pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full select-none' />);
ParticleFallback.displayName = 'ParticleFallback';

const ParticleBackground = memo<ParticleBackgroundProps>(({ className }) => {
	const { resolvedTheme } = useTheme();
	const reducedMotion = useReducedMotion();
	// Probe in useEffect (not a useState initializer) so SSR and first client render agree —
	// both start with `false`, then the client flips to the real capability after mount.
	// Worst case on supported devices: one frame of the CSS fallback before the canvas mounts.
	const [canRenderScene, setCanRenderScene] = useState(false);
	useEffect(() => {
		setCanRenderScene(supportsHalfFloatFBO());
	}, []);
	const isDark = resolvedTheme === 'dark';

	const showScene = !reducedMotion && canRenderScene;

	return (
		<div className={cn('section-separator pointer-events-none -z-1 overflow-hidden will-change-transform select-none', className)} aria-hidden='true'>
			{showScene ? <ParticleScene isDark={isDark} /> : <ParticleFallback />}
		</div>
	);
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
