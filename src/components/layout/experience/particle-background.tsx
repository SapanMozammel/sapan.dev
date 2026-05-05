'use client';

import { cn } from '@/lib/utils';
import type { ParticleBackgroundProps } from '@/types/particles';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

const ParticleScene = dynamic(() => import('./particles/particle-scene'), { ssr: false });

// Probe once at mount. WebGL 2 does NOT make RGBA16F color-renderable by default — the
// spec requires EXT_color_buffer_float (or EXT_color_buffer_half_float). Without it,
// three.js silently binds an incomplete FBO and the simulation texture stays empty,
// so every particle samples position (0,0,0) and the scene renders as nothing.
// After the extension check we build a tiny half-float FBO and verify completeness,
// which catches drivers that expose the extension but still reject the combo.
const supportsHalfFloatFBO = (): boolean => {
	if (typeof window === 'undefined') return false;
	try {
		const canvas = document.createElement('canvas');
		const gl2 = canvas.getContext('webgl2');
		if (gl2) {
			const hasExt = gl2.getExtension('EXT_color_buffer_float') || gl2.getExtension('EXT_color_buffer_half_float');
			if (!hasExt) return false;
			const tex = gl2.createTexture();
			gl2.bindTexture(gl2.TEXTURE_2D, tex);
			gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA16F, 2, 2, 0, gl2.RGBA, gl2.HALF_FLOAT, null);
			const fbo = gl2.createFramebuffer();
			gl2.bindFramebuffer(gl2.FRAMEBUFFER, fbo);
			gl2.framebufferTexture2D(gl2.FRAMEBUFFER, gl2.COLOR_ATTACHMENT0, gl2.TEXTURE_2D, tex, 0);
			const ok = gl2.checkFramebufferStatus(gl2.FRAMEBUFFER) === gl2.FRAMEBUFFER_COMPLETE;
			gl2.deleteFramebuffer(fbo);
			gl2.deleteTexture(tex);
			return ok;
		}
		const gl1 = canvas.getContext('webgl');
		if (!gl1) return false;
		return Boolean(gl1.getExtension('OES_texture_half_float') && gl1.getExtension('EXT_color_buffer_half_float'));
	} catch {
		return false;
	}
};

// Theme-adaptive fallback that replaces the WebGL scene on touch devices and
// unsupported GPUs. Uses the design system's light-mode primary + dark-mode
// success swap (indigo on white, teal on black) at 45% to stay perceivable
// on mid-range phone screens in ambient light — `glow-blob-primary`'s 28%
// reads as near-black on OLED panels and was the source of the "blank area"
// symptom after the coarse-pointer gate stopped the scene from mounting.
const ParticleFallback = memo(() => (
	<div aria-hidden className='bg-primary/45 dark:bg-success/45 pointer-events-none absolute top-1/2 left-1/2 h-65 w-160 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[5rem] select-none' />
));
ParticleFallback.displayName = 'ParticleFallback';

const ParticleBackground = memo<ParticleBackgroundProps>(({ className }) => {
	const { resolvedTheme } = useTheme();
	const reducedMotion = useReducedMotion();
	// Probe in useEffect (not a useState initializer) so SSR and first client render agree —
	// both start with `false`, then the client flips to the real capability after mount.
	// Worst case on supported devices: one frame of the CSS fallback before the canvas mounts.
	const [canRenderScene, setCanRenderScene] = useState(false);
	// Skip the WebGL scene on coarse-pointer devices (phones/tablets) — even
	// where the half-float probe reports success, real-world mobile GPU stacks
	// (iOS Safari quirks, Mali/Adreno drivers, WebViews) fail intermittently,
	// and the thermal/battery cost isn't worth the ambient effect on a device
	// the user is holding. The CSS `glow-blob-primary` fallback still renders.
	const [isCoarsePointer, setIsCoarsePointer] = useState(false);
	// Pause the render loop while the section is offscreen so the GPU isn't
	// spinning at 60fps while the user reads Articles/Contact below — kills
	// mobile battery and thermally throttles scroll perf on mid-range Android.
	const [inView, setInView] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setCanRenderScene(supportsHalfFloatFBO());
		setIsCoarsePointer(window.matchMedia('(pointer: coarse)').matches);
	}, []);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), { rootMargin: '400px' });
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	// iOS Safari evicts WebGL contexts under memory pressure (tab switch, low-mem).
	// Once lost the canvas would stay blank forever, so flip back to the CSS fallback.
	const handleContextLost = useCallback(() => {
		setCanRenderScene(false);
	}, []);

	const isDark = resolvedTheme === 'dark';
	const showScene = !reducedMotion && !isCoarsePointer && canRenderScene;

	return (
		<div ref={containerRef} className={cn('section-separator pointer-events-none -z-1 overflow-hidden will-change-transform select-none', className)} aria-hidden='true'>
			{showScene ? <ParticleScene isDark={isDark} inView={inView} onContextLost={handleContextLost} /> : <ParticleFallback />}
		</div>
	);
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
