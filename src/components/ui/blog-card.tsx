import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '@/data/content/blogs';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getBlurDataURL } from '@/lib/utils/image';
import type { BlogCardProps } from '@/types/blog';
import { IconArrowRight, IconClock } from '@tabler/icons-react';
import Image from 'next/image';
const BLUR_PLACEHOLDER = getBlurDataURL(800, 450);

const formatDate = (dateString: string): string =>
	new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});

const BlogCard = ({ post, className }: BlogCardProps) => {
	const categoryColor = CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR;

	return (
		<Link
			href={`/articles/${post.slug}`}
			className={cn(
				'group border-secondary-200/50 dark:border-secondary-700/50 relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:bg-black dark:hover:shadow-white/5',
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
				<span className={cn('font-hg absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm', categoryColor)}>{post.category}</span>
			</div>
			<div className='flex grow flex-col gap-3 p-5'>
				<div className='flex grow flex-col gap-2'>
					<h3 className='font-cg group-hover:text-primary dark:group-hover:text-success text-dark text-lg leading-snug font-medium tracking-wide transition-colors duration-200 sm:text-xl dark:text-white'>
						{post.title}
					</h3>
					<p className='text-secondary-600 dark:text-secondary-400 line-clamp-2 text-sm leading-relaxed'>{post.excerpt}</p>
				</div>
				<div className='flex flex-wrap gap-1.5'>
					{post.tags.slice(0, 3).map((tag) => (
						<span key={tag} className='font-hg bg-secondary-100 text-secondary-500 dark:bg-secondary-800 dark:text-secondary-500 rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase'>
							{tag}
						</span>
					))}
				</div>
				<div className='border-secondary-100 dark:border-secondary-800 mt-1.5 flex items-center justify-between border-t pt-4'>
					<div className='text-secondary-400 dark:text-secondary-600 flex items-center gap-3 text-xs'>
						<span className='font-hg font-medium'>{formatDate(post.publishedAt)}</span>
						<span className='flex items-center gap-1'>
							<IconClock size={12} stroke={2} />
							<span className='font-hg font-medium'>{post.readTime} min</span>
						</span>
					</div>
					<span className='font-hg text-primary dark:text-success transition-gap inline-flex items-center gap-1 text-sm font-semibold tracking-wider uppercase duration-200 group-hover:gap-2'>
						<span>Read More</span>
						<IconArrowRight stroke={3} className='mb-0.5 h-4 w-4 transition-transform duration-300' />
					</span>
				</div>
			</div>
		</Link>
	);
};

export default BlogCard;
