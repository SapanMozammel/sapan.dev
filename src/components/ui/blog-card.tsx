import { cn } from '@/lib/utils';
import { getBlurDataURL } from '@/lib/utils/image';
import type { BlogCardProps } from '@/types/blog';
import { IconArrowRight, IconClock } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

const CATEGORY_COLORS: Record<string, string> = {
	'Next.js': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
	TypeScript: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
	CSS: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
	Accessibility: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
	Performance: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
	React: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400',
};

const DEFAULT_CATEGORY_COLOR = 'bg-secondary-100 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-400';
const BLUR_PLACEHOLDER = getBlurDataURL(800, 450);

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

const BlogCard = memo<BlogCardProps>(({ post, className }) => {
	const categoryColor = CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR;

	return (
		<Link
			href={`/blog/${post.slug}`}
			className={cn(
				'group border-secondary-200/60 dark:border-secondary-700/40 dark:hover:border-secondary-600/60 relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:bg-black/20 dark:hover:shadow-black/20',
				className
			)}
		>
			<div className='relative h-48 w-full shrink-0 overflow-hidden sm:h-52'>
				<Image
					src={post.thumbnail}
					alt={post.title}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className='object-cover transition-transform duration-500 group-hover:scale-105'
					placeholder='blur'
					blurDataURL={BLUR_PLACEHOLDER}
					loading='lazy'
					quality={85}
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
				<span className={cn('font-sora absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm', categoryColor)}>{post.category}</span>
			</div>
			<div className='flex grow flex-col gap-3 p-5'>
				<div className='flex grow flex-col gap-2'>
					<h3 className='font-cg group-hover:text-primary dark:group-hover:text-success text-lg leading-snug font-medium tracking-wide text-black transition-colors duration-200 sm:text-xl dark:text-white'>
						{post.title}
					</h3>
					<p className='text-secondary-600 dark:text-secondary-400 line-clamp-2 text-sm leading-relaxed'>{post.excerpt}</p>
				</div>
				<div className='flex flex-wrap gap-1.5'>
					{post.tags.slice(0, 3).map((tag) => (
						<span
							key={tag}
							className='font-sora bg-secondary-100 text-secondary-500 dark:bg-secondary-800/60 dark:text-secondary-500 rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase'
						>
							{tag}
						</span>
					))}
				</div>
				<div className='border-secondary-100 dark:border-secondary-800 flex items-center justify-between border-t pt-3'>
					<div className='text-secondary-400 dark:text-secondary-500 flex items-center gap-3 text-xs'>
						<span className='font-sora font-medium'>{formatDate(post.publishedAt)}</span>
						<span className='flex items-center gap-1'>
							<IconClock size={12} stroke={2} />
							<span className='font-sora font-medium'>{post.readTime} min</span>
						</span>
					</div>
					<span className='font-sora text-primary dark:text-success transition-gap inline-flex items-center gap-1 text-sm font-semibold tracking-wider uppercase duration-200 group-hover:gap-2'>
						<span>Read More</span>
						<IconArrowRight stroke={3} className='mb-0.5 h-4 w-4 transition-transform duration-300' />
					</span>
				</div>
			</div>
		</Link>
	);
});

BlogCard.displayName = 'BlogCard';

export default BlogCard;
