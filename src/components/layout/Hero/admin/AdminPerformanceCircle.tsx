const AdminPerformanceCircle = () => {
	return (
		<div className='border-info/50 bg-light/70 pointer-events-none absolute top-[20em] right-0 aspect-square h-[12em] translate-x-1/2 rounded-full border-[0.05em] border-solid backdrop-blur select-none dark:bg-slate-900/70'>
			<div className='absolute inset-[0.2em]'>
				<svg className='absolute inset-[1.3em] fill-none' viewBox='-3.5 -3 112 112'>
					<path
						d='M105 53C105 82.2711 81.4949 106 52.5 106C23.5051 106 0 82.2711 0 53C0 23.7289 23.5051 0 52.5 0C81.4949 0 105 23.7289 105 53Z'
						className='stroke-info'
						strokeOpacity='0.5'
						strokeWidth='5'
						strokeDasharray='0.5 5'
					/>
				</svg>
				<div className='border-info/50 absolute inset-[1em] rounded-full border-[0.25em] border-solid' />
				<div className='text-dark/70 absolute inset-[1em] flex items-center justify-center text-center text-[3.75em] font-extrabold dark:text-white/70'>98</div>
				<svg className='animate-spin-slow absolute inset-[0.1em]' viewBox='0 0 100 100'>
					<path id='curve-text' fill='transparent' strokeWidth='none' d='M0 50a1 1 0 0 1 100 0A1 1 0 0 1 0 50' />
					<text>
						<textPath className='fill-info/80' dominantBaseline='hanging' fontSize='0.435em' href='#curve-text' letterSpacing='0.1em'>
							PERFORMANCE - PERFORMANCE - PERFORMANCE - PERFORMANCE - PERFORMANCE - PERFORMANCE -
						</textPath>
					</text>
				</svg>
			</div>
		</div>
	);
};

export default AdminPerformanceCircle;
