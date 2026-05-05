import { getBlurDataURL } from '@/lib/utils/image';
import Image from 'next/image';

const PhotoCard = () => {
	return (
		<div className='border-info/20 bg-light/10 pointer-events-none absolute -bottom-[4em] -left-[4em] flex w-[22em] flex-col items-start rounded-[2.25em] border-[0.05em] border-solid p-[1em] backdrop-blur transition-transform delay-500 duration-1000 ease-in-out select-none group-hover/about-screen:-translate-x-[1em] dark:bg-slate-900/10'>
			<div className='border-info/30 relative flex aspect-[4/5] w-full items-end justify-center overflow-hidden rounded-[1.25em] border-[0.05em] border-solid bg-white/30 dark:bg-black/30'>
				<Image
					src='/images/me/sapan-halfshot.png'
					alt='Portrait of Sapan Mozammel'
					fill
					sizes='(max-width: 768px) 60vw, 22em'
					placeholder='blur'
					blurDataURL={getBlurDataURL(400, 500)}
					className='object-cover object-top'
				/>
			</div>
			<div className='pointer-events-auto mt-[1em] flex w-full flex-col gap-[0.25em] px-[0.5em] pb-[0.25em] select-text'>
				<h3 className='font-hg text-dark text-[1.05em] leading-tight dark:text-white'>
					Sapan Mozammel <span className='text-secondary-500 dark:text-secondary-400'>(Mozammel Ali)</span>
				</h3>
				<p className='text-secondary-500 text-[0.65em] tracking-widest uppercase'>Frontend Developer</p>
			</div>
		</div>
	);
};

export default PhotoCard;
