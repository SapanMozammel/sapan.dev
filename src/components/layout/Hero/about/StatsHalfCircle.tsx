const StatsHalfCircle = () => {
	return (
		<div className='border-info/50 bg-light/70 font-hg pointer-events-none absolute top-[2.5em] -left-[7.5em] aspect-square h-[8.5em] rounded-full border-[0.05em] border-solid backdrop-blur select-none dark:bg-slate-900/70'>
			<div className='absolute inset-[0.2em]'>
				<svg viewBox='-4 -4 148 148' xmlns='http://www.w3.org/2000/svg' className='absolute -inset-[1.1em] fill-none'>
					<g filter='url(#half-wave-wrapper)'>
						<path
							d='M70 140C88.5652 140 106.37 132.625 119.497 119.497C132.625 106.37 140 88.5652 140 70C140 51.4349 132.625 33.6301 119.497 20.5025C106.37 7.37499 88.5652 8.63117e-06 70 0'
							stroke='url(#half-wave-stroke)'
							strokeWidth='8'
							strokeDasharray='0.8 5'
						/>
					</g>
					<defs>
						<filter id='half-wave-wrapper' x='70' y='-4' width='74' height='148' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
							<feFlood floodOpacity='0' result='BackgroundImageFix' />
							<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
							<feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
							<feOffset dy='1' />
							<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
							<feColorMatrix type='matrix' values='0 0 0 0 0.556863 0 0 0 0 0.607843 0 0 0 0 0.682353 0 0 0 0.5 0' />
							<feBlend mode='normal' in2='shape' result='effect1_innerShadow_23632_3864' />
						</filter>
						<linearGradient id='half-wave-stroke' x1='99.1609' y1='3.0511' x2='130.689' y2='119.502' gradientUnits='userSpaceOnUse'>
							<stop stopColor='var(--color-amber-200)' />
							<stop offset='0.965972' stopColor='var(--color-success)' />
						</linearGradient>
					</defs>
				</svg>
				<svg xmlns='http://www.w3.org/2000/svg' className='absolute inset-0 fill-none' viewBox='-1 -1 124 124'>
					<path
						fill='url(#half-line-gradient)'
						d='M61 120.17c0 1.011.82 1.833 1.83 1.803a61.01 61.01 0 0 0 54.527-37.63 61 61 0 0 0 0-46.687A61 61 0 0 0 62.83.027C61.82-.003 61 .82 61 1.83s.82 1.827 1.83 1.86a57.34 57.34 0 0 1 0 114.621c-1.01.032-1.83.848-1.83 1.859'
					/>
					<path
						stroke='var(--color-white)'
						strokeOpacity='0.1'
						d='M61 120.17c0 1.011.82 1.833 1.83 1.803a61.01 61.01 0 0 0 54.527-37.63 61 61 0 0 0 0-46.687A61 61 0 0 0 62.83.027C61.82-.003 61 .82 61 1.83s.82 1.827 1.83 1.86a57.34 57.34 0 0 1 0 114.621c-1.01.032-1.83.848-1.83 1.859Z'
					/>
					<defs>
						<linearGradient id='half-line-gradient' x1='19.409' x2='122' y1='0' y2='122' gradientUnits='userSpaceOnUse'>
							<stop stopColor='var(--color-white)' />
							<stop offset='0.75' stopColor='var(--color-info)' />
						</linearGradient>
					</defs>
				</svg>
				<svg xmlns='http://www.w3.org/2000/svg' className='absolute bottom-[0.15em] left-1/2 aspect-square w-[4em] -translate-x-1/2 translate-y-1/2 rotate-25 fill-none' viewBox='-1 -1 51 51'>
					<g filter='url(#triangle-wrapper)'>
						<path fill='url(#triangle-fill)' fillOpacity='0.9' d='M35.23 25.292c2.018 3.278-.27 7.51-4.117 7.618l-13.11.368c-3.848.108-6.37-3.99-4.539-7.376l6.237-11.537c1.83-3.386 6.64-3.52 8.657-.243z' />
					</g>
					<defs>
						<radialGradient id='triangle-fill' cx='0' cy='0' r='1' gradientTransform='matrix(-19.23654 -10.39856 5.15443 -9.53531 24.295 24.342)' gradientUnits='userSpaceOnUse'>
							<stop stopColor='var(--color-info)' />
							<stop offset='1' stopColor='var(--color-info)' />
						</radialGradient>
						<filter id='triangle-wrapper' width='45.127' height='43.537' x='1.854' y='0.743' colorInterpolationFilters='sRGB' filterUnits='userSpaceOnUse'>
							<feFlood result='BackgroundImageFix' />
							<feGaussianBlur in='BackgroundImageFix' stdDeviation='5' />
							<feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_23632_3869' />
							<feBlend in='SourceGraphic' in2='effect1_backgroundBlur_23632_3869' result='shape' />
							<feColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
							<feOffset />
							<feGaussianBlur stdDeviation='10' />
							<feComposite in2='hardAlpha' k2='-1' k3='1' operator='arithmetic' />
							<feColorMatrix values='0 0 0 0 0.497041 0 0 0 0 0.638518 0 0 0 0 0.740967 0 0 0 0.52 0' />
							<feBlend in2='shape' result='effect2_innerShadow_23632_3869' />
						</filter>
					</defs>
				</svg>
				<div className='absolute inset-0 flex flex-col items-center justify-center'>
					<div className='text-dark/70 text-[2.25em] leading-none font-bold tracking-tighter dark:text-white/70'>6M+</div>
					<div className='text-dark/70 mt-[0.25em] text-[0.6em] font-bold tracking-widest uppercase dark:text-white/70'>Users Reached</div>
				</div>
			</div>
		</div>
	);
};

export default StatsHalfCircle;
