'use client';

import { Effects } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { memo, Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Particles from './particles';
import { VignetteShader } from './shaders/vignette-shader';

// Parallax rig — listens to window pointermove so both desktop cursor hover and
// mobile touch-drag drive the rotation (mousemove never fires from a finger on iOS/Android).
const ParallaxRig = memo<{ children: React.ReactNode }>(({ children }) => {
	const groupRef = useRef<THREE.Group>(null);
	const pointer = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const onMove = (e: PointerEvent) => {
			pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
			pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
		};
		window.addEventListener('pointermove', onMove, { passive: true });
		return () => window.removeEventListener('pointermove', onMove);
	}, []);

	useFrame((_state, delta) => {
		if (!groupRef.current) {
			return;
		}
		const smooth = 1 - Math.pow(0.001, delta); // frame-rate independent smoothing
		groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.current.x * 0.12, smooth);
		groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.current.y * 0.08, smooth);
	});

	return <group ref={groupRef}>{children}</group>;
});

ParallaxRig.displayName = 'ParallaxRig';

type ParticleSceneProps = {
	isDark: boolean;
	inView: boolean;
	onContextLost: () => void;
};

const ParticleScene = memo<ParticleSceneProps>(({ isDark, inView, onContextLost }) => {
	return (
		<Canvas
			camera={{
				position: [0, 4.5, -0.5],
				fov: 65,
				near: 0.01,
				far: 300,
			}}
			dpr={[1, 1.5]}
			frameloop={inView ? 'always' : 'never'}
			gl={{
				antialias: false,
				alpha: true,
				powerPreference: 'high-performance',
			}}
			style={{ background: 'transparent' }}
			onCreated={(state) => {
				state.gl.domElement.addEventListener(
					'webglcontextlost',
					() => {
						onContextLost();
					},
					false
				);
			}}
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
