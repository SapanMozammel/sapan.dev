import SectionSeparator from '@/components/layout/common/SectionSeparator';
import Badge from '@/components/ui/badge';
import BlogCard from '@/components/ui/blog-card';
import MetaLabel from '@/components/ui/meta-label';
import { BLOG_POSTS, CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '@/data/content/blogs';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getBlurDataURL } from '@/lib/utils/image';
import type { ContentBlock } from '@/types/blog';
import { IconArrowLeft, IconClock, IconTag } from '@tabler/icons-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const BLUR_PLACEHOLDER = getBlurDataURL(1200, 600);

type Props = {
	params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
	return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = BLOG_POSTS.find((p) => p.slug === slug);
	if (!post) {
		return {};
	}
	return {
		title: post.title,
		description: post.excerpt,
	};
}

const renderBlock = (block: ContentBlock, index: number) => {
	switch (block.type) {
		case 'heading':
			return (
				<h3 key={index} className='text-heading-medium-alt text-dark mt-8 mb-4 tracking-wide dark:text-white'>
					{block.text}
				</h3>
			);

		case 'paragraph':
			return (
				<p key={index} className='text-paragraph-small text-secondary-600 dark:text-secondary-400 mb-4'>
					{block.text}
				</p>
			);
		case 'code':
			return (
				<div key={index} className='mb-4 overflow-hidden rounded-xl'>
					<div className='bg-secondary-800 flex items-center justify-between px-4 py-2'>
						<span className='font-hg text-secondary-400 text-xs font-bold tracking-widest uppercase'>{block.language}</span>
						<div className='flex gap-1.5'>
							<span className='bg-danger/70 h-2.5 w-2.5 rounded-full' />
							<span className='bg-warning/70 h-2.5 w-2.5 rounded-full' />
							<span className='bg-success/70 h-2.5 w-2.5 rounded-full' />
						</div>
					</div>
					<pre className='bg-secondary-900 text-paragraph-small overflow-x-auto p-5'>
						<code className='text-secondary-100'>{block.code}</code>
					</pre>
				</div>
			);
		case 'list':
			if (block.ordered) {
				return (
					<ol key={index} className='mb-4 list-decimal space-y-2 pl-6'>
						{block.items.map((item, i) => (
							<li key={i} className='text-paragraph-small text-secondary-600 dark:text-secondary-400'>
								{item}
							</li>
						))}
					</ol>
				);
			}
			return (
				<ul key={index} className='mb-4 space-y-2 pl-6'>
					{block.items.map((item, i) => (
						<li
							key={i}
							className='text-secondary-600 dark:text-secondary-400 before:bg-primary dark:before:bg-success relative before:absolute before:top-[0.6em] before:-left-4 before:h-1.5 before:w-1.5 before:rounded-full'
						>
							{item}
						</li>
					))}
				</ul>
			);
		case 'callout': {
			const variantStyles = {
				info: 'border-info/50 bg-info/5',
				warning: 'border-warning/50 bg-warning/5',
				tip: 'border-success/50 bg-success/5',
			};
			const labelStyles = {
				info: 'text-info',
				warning: 'text-warning',
				tip: 'text-success',
			};
			const variant = block.variant ?? 'info';
			return (
				<div key={index} className={cn('mb-4 rounded-xl border-l-4 p-4 sm:p-5', variantStyles[variant])}>
					<p className={cn('text-heading-xsmall mb-1 tracking-widest uppercase', labelStyles[variant])}>{variant}</p>
					<p className='text-paragraph-small text-secondary-600 dark:text-secondary-400'>{block.text}</p>
				</div>
			);
		}
		default:
			return null;
	}
};

const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

const BlogDetailPage = async ({ params }: Props) => {
	const { slug } = await params;
	const post = BLOG_POSTS.find((p) => p.slug === slug);

	if (!post) {
		notFound();
	}

	const translateBlog = await getTranslations('blog');
	const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
	const categoryColor = CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR;

	return (
		<section className='relative z-1 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pb-32'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 sm:gap-5'>
					{/* Back navigation */}
					<div className='w-full pt-6 sm:pt-10'>
						<Link
							href='/articles'
							className='text-secondary-500 hover:text-primary dark:hover:text-success text-heading-xsmall inline-flex items-center gap-2 tracking-wider uppercase transition-colors duration-200'
						>
							<IconArrowLeft size={14} stroke={2.5} />
							{translateBlog('backToList')}
						</Link>
					</div>
					<div className='border-secondary-200/50 dark:border-secondary-700/50 relative w-full overflow-hidden rounded-2xl border bg-white shadow-lg shadow-black/5 dark:bg-black dark:shadow-white/5'>
						<div className='relative h-56 w-full overflow-hidden sm:h-72 lg:h-96'>
							<Image src={post.thumbnail} alt={post.title} fill sizes='(max-width: 768px) 100vw, 1200px' className='object-cover' placeholder='blur' blurDataURL={BLUR_PLACEHOLDER} priority quality={90} />
							<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
							<span className={cn('font-hg absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm', categoryColor)}>{post.category}</span>
						</div>
						<div className='flex flex-col gap-5 p-6 sm:p-8 lg:p-10'>
							<div className='flex flex-wrap items-center gap-3'>
								<MetaLabel icon={<IconClock size={13} stroke={2} />}>{post.readTime} min</MetaLabel>
								<span className='bg-secondary-200 dark:bg-secondary-700 h-1 w-1 rounded-full' />
								<MetaLabel>{formatDate(post.publishedAt)}</MetaLabel>
							</div>
							<h1 className='sr-only'>{post.title}</h1>
							<h2 className='text-heading-xlarge text-dark tracking-wide dark:text-white'>{post.title}</h2>
							<p className='text-secondary-700 dark:text-secondary-300 text-paragraph-medium max-w-5xl'>{post.excerpt}</p>
							<div className='flex flex-wrap items-center gap-2'>
								<IconTag size={13} stroke={2} className='text-secondary-400 dark:text-secondary-600' />
								{post.tags.map((tag) => (
									<Badge key={tag}>{tag}</Badge>
								))}
							</div>
						</div>
					</div>
					<div className='mt-4 w-full max-w-5xl'>
						<div className='prose-custom'>{post.content.map((block, index) => renderBlock(block, index))}</div>
					</div>
					{otherPosts.length > 0 && (
						<div className='w-full'>
							<div className='border-secondary-200/50 dark:border-secondary-700/50 mb-6 border-t pt-8'>
								<p className='text-secondary-500 text-heading-xsmall mb-5 tracking-widest uppercase'>{translateBlog('moreIn', { category: post.category })}</p>
								<div className='grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3'>
									{otherPosts.map((related) => (
										<BlogCard key={related.slug} post={related} />
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</SectionSeparator>
		</section>
	);
};

export default BlogDetailPage;
