import Badge from '@/components/ui/badge';
import CTALink from '@/components/ui/cta-link';
import MetaLabel from '@/components/ui/meta-label';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '@/data/content/blogs';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getBlurDataURL } from '@/lib/utils/image';
import type { BlogCardProps } from '@/types/blog';
import { IconClock } from '@tabler/icons-react';
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
					<h5 className='text-heading-small group-hover:text-primary dark:group-hover:text-success text-dark tracking-wide transition-colors duration-200 dark:text-white'>{post.title}</h5>
					<p className='text-secondary-600 dark:text-secondary-400 text-paragraph-small line-clamp-2'>{post.excerpt}</p>
				</div>
				<div className='flex flex-wrap gap-1.5'>
					{post.tags.slice(0, 3).map((tag) => (
						<Badge key={tag}>{tag}</Badge>
					))}
				</div>
				<div className='border-secondary-100 dark:border-secondary-800 mt-1.5 flex items-center justify-between border-t pt-4'>
					<div className='flex items-center gap-3'>
						<MetaLabel>{formatDate(post.publishedAt)}</MetaLabel>
						<MetaLabel icon={<IconClock size={12} stroke={2} />}>{post.readTime} min</MetaLabel>
					</div>
					<CTALink>Read More</CTALink>
				</div>
			</div>
		</Link>
	);
};

export default BlogCard;
