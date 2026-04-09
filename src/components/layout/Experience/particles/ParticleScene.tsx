'use client';

import { Effects } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { memo, Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Particles from './Particles';
import { VignetteShader } from './shaders/vignetteShader';

// Parallax rig — listens to window mousemove (works even when canvas has pointer-events: none)
// and smoothly rotates its children toward the cursor.
const ParallaxRig = memo<{ children: React.ReactNode }>(({ children }) => {
	const groupRef = useRef<THREE.Group>(null);
	const mouse = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
		};
		window.addEventListener('mousemove', onMove, { passive: true });
		return () => window.removeEventListener('mousemove', onMove);
	}, []);

	useFrame((_state, delta) => {
		if (!groupRef.current) {
			return;
		}
		const smooth = 1 - Math.pow(0.001, delta); // frame-rate independent smoothing
		groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.12, smooth);
		groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.current.y * 0.08, smooth);
	});

	return <group ref={groupRef}>{children}</group>;
});

ParallaxRig.displayName = 'ParallaxRig';

const ParticleScene = memo<{ isDark: boolean }>(({ isDark }) => {
	return (
		<Canvas
			camera={{
				position: [0, 4.5, -0.5],
				fov: 65,
				near: 0.01,
				far: 300,
			}}
			dpr={[1, 1.5]}
			gl={{
				antialias: false,
				alpha: true,
				powerPreference: 'high-performance',
			}}
			style={{ background: 'transparent' }}
		>
			<Suspense fallback={null}>
				<ParallaxRig>
					<Particles isDark={isDark} />
				</ParallaxRig>
				<Effects multisamping={0} disableGamma>
					<shaderPass args={[VignetteShader]} uniforms-darkness-value={1.5} uniforms-offset-value={0.4} />
				</Effects>
			</Suspense>
		</Canvas>
	);
});

ParticleScene.displayName = 'ParticleScene';

export default ParticleScene;
