import SectionSeparator from '@/components/layout/common/SectionSeparator';
import BlogCard from '@/components/ui/blog-card';
import { BLOG_POSTS } from '@/data/content/blogs';
import { cn } from '@/lib/utils';
import { getBlurDataURL } from '@/lib/utils/image';
import type { ContentBlock } from '@/types/blog';
import { IconArrowLeft, IconClock, IconTag } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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

function renderBlock(block: ContentBlock, index: number) {
	switch (block.type) {
		case 'heading':
			if (block.level === 2) {
				return (
					<h2 key={index} className='font-cg mt-10 mb-4 text-2xl font-medium tracking-wide text-black sm:text-3xl dark:text-white'>
						{block.text}
					</h2>
				);
			}
			return (
				<h3 key={index} className='font-cg mt-8 mb-3 text-xl font-medium tracking-wide text-black sm:text-2xl dark:text-white'>
					{block.text}
				</h3>
			);

		case 'paragraph':
			return (
				<p key={index} className='text-secondary-700 dark:text-secondary-300 mb-5 text-[15px] leading-relaxed sm:text-base'>
					{block.text}
				</p>
			);
		case 'code':
			return (
				<div key={index} className='mb-6 overflow-hidden rounded-xl'>
					<div className='bg-secondary-800 dark:bg-secondary-900/80 flex items-center justify-between px-4 py-2'>
						<span className='font-sora text-secondary-400 text-[10px] font-semibold tracking-widest uppercase'>{block.language}</span>
						<div className='flex gap-1.5'>
							<span className='h-2.5 w-2.5 rounded-full bg-red-400/70' />
							<span className='h-2.5 w-2.5 rounded-full bg-yellow-400/70' />
							<span className='h-2.5 w-2.5 rounded-full bg-green-400/70' />
						</div>
					</div>
					<pre className='bg-secondary-900 overflow-x-auto p-5 text-[13px] leading-relaxed dark:bg-black/60'>
						<code className='text-secondary-100'>{block.code}</code>
					</pre>
				</div>
			);
		case 'list':
			if (block.ordered) {
				return (
					<ol key={index} className='mb-5 list-decimal space-y-2 pl-6'>
						{block.items.map((item, i) => (
							<li key={i} className='text-secondary-700 dark:text-secondary-300 text-[15px] leading-relaxed sm:text-base'>
								{item}
							</li>
						))}
					</ol>
				);
			}
			return (
				<ul key={index} className='mb-5 space-y-2 pl-6'>
					{block.items.map((item, i) => (
						<li
							key={i}
							className='text-secondary-700 dark:text-secondary-300 before:bg-primary dark:before:bg-success relative text-[15px] leading-relaxed before:absolute before:top-[0.6em] before:-left-4 before:h-1.5 before:w-1.5 before:rounded-full sm:text-base'
						>
							{item}
						</li>
					))}
				</ul>
			);
		case 'callout': {
			const variantStyles = {
				info: 'border-blue-400/40 bg-blue-50/60 dark:bg-blue-950/30 dark:border-blue-500/30',
				warning: 'border-orange-400/40 bg-orange-50/60 dark:bg-orange-950/30 dark:border-orange-500/30',
				tip: 'border-green-400/40 bg-green-50/60 dark:bg-green-950/30 dark:border-green-500/30',
			};
			const labelStyles = {
				info: 'text-blue-600 dark:text-blue-400',
				warning: 'text-orange-600 dark:text-orange-400',
				tip: 'text-green-600 dark:text-green-400',
			};
			const variant = block.variant ?? 'info';
			return (
				<div key={index} className={cn('mb-5 rounded-xl border-l-4 p-4 sm:p-5', variantStyles[variant])}>
					<p className={cn('font-sora mb-1 text-[10px] font-bold tracking-widest uppercase', labelStyles[variant])}>{variant}</p>
					<p className='text-secondary-700 dark:text-secondary-300 text-[15px] leading-relaxed sm:text-base'>{block.text}</p>
				</div>
			);
		}
		default:
			return null;
	}
}

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

const BlogDetailPage = async ({ params }: Props) => {
	const { slug } = await params;
	const post = BLOG_POSTS.find((p) => p.slug === slug);

	if (!post) {
		notFound();
	}

	const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

	return (
		<section className='flex flex-col pt-14 sm:pt-20'>
			<div className='relative z-2 flex grow flex-col pb-8 sm:pb-12 lg:pb-16'>
				<SectionSeparator lts rts lbs rbs tl bl ll rl>
					<div className='container flex w-full grow flex-col items-center justify-start gap-8 pb-8 sm:pb-12 lg:pb-16'>
						{/* Back navigation */}
						<div className='w-full pt-6 sm:pt-10'>
							<Link
								href='/articles'
								className='font-hg text-secondary-500 hover:text-primary dark:hover:text-success inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors duration-200'
							>
								<IconArrowLeft size={14} stroke={2.5} />
								All Articles
							</Link>
						</div>
						<div className='border-secondary-200/60 dark:border-secondary-700/40 shadow-secondary-300/10 dark:shadow-dark/10 relative w-full overflow-hidden rounded-2xl border bg-white shadow-xl dark:bg-black/20'>
							<div className='relative h-56 w-full overflow-hidden sm:h-72 lg:h-96'>
								<Image
									src={post.thumbnail}
									alt={post.title}
									fill
									sizes='(max-width: 768px) 100vw, 1200px'
									className='object-cover'
									placeholder='blur'
									blurDataURL={BLUR_PLACEHOLDER}
									priority
									quality={90}
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
								<span className='font-sora bg-primary/90 dark:bg-success/90 absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm dark:text-black'>
									{post.category}
								</span>
							</div>
							<div className='flex flex-col gap-5 p-6 sm:p-8 lg:p-10'>
								<div className='flex flex-wrap items-center gap-3'>
									<div className='text-secondary-400 dark:text-secondary-500 flex items-center gap-1.5 text-xs'>
										<IconClock size={13} stroke={2} />
										<span className='font-sora font-medium'>{post.readTime} min read</span>
									</div>
									<span className='bg-secondary-200/60 dark:bg-secondary-700/40 h-1 w-1 rounded-full' />
									<span className='text-secondary-400 dark:text-secondary-500 font-sora text-xs font-medium'>{formatDate(post.publishedAt)}</span>
								</div>
								<h1 className='font-cg text-3xl leading-tight font-medium tracking-wide text-black sm:text-4xl lg:text-5xl dark:text-white'>{post.title}</h1>
								<p className='text-secondary-600 dark:text-secondary-400 max-w-3xl text-base leading-relaxed sm:text-lg'>{post.excerpt}</p>
								<div className='flex flex-wrap items-center gap-2'>
									<IconTag size={13} stroke={2} className='text-secondary-400 dark:text-secondary-500' />
									{post.tags.map((tag) => (
										<span
											key={tag}
											className='font-sora bg-secondary-100 text-secondary-500 dark:bg-secondary-800/60 dark:text-secondary-500 rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase'
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
						<div className='w-full max-w-3xl'>
							<div className='prose-custom'>{post.content.map((block, index) => renderBlock(block, index))}</div>
						</div>
						{otherPosts.length > 0 && (
							<div className='w-full'>
								<div className='border-secondary-200/60 dark:border-secondary-700/40 mb-6 border-t pt-8'>
									<p className='font-sora text-secondary-400 dark:text-secondary-500 mb-5 text-sm font-semibold tracking-widest uppercase'>More in {post.category}</p>
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
			</div>
		</section>
	);
};

export default BlogDetailPage;
