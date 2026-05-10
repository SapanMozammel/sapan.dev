import SectionSeparator from '@/components/layout/common/section-separator';
import Badge from '@/components/ui/badge';
import BlogCard from '@/components/ui/blog-card';
import MetaLabel from '@/components/ui/meta-label';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '@/data/config/blog-categories';
import { BLOG_POSTS } from '@/data/content/blogs';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getBlurDataURL } from '@/lib/utils/image';
import { IconArrowLeft, IconClock, IconTag } from '@tabler/icons-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { renderBlock } from './render-block';

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

const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

const BlogDetailPage = async ({ params }: Props) => {
	const { slug, locale } = await params;
	setRequestLocale(locale);
	const post = BLOG_POSTS.find((p) => p.slug === slug);

	if (!post) {
		notFound();
	}

	const translateBlog = await getTranslations('blog');
	const translateCallout = await getTranslations('blog.callout');
	const calloutLabels = {
		info: translateCallout('info'),
		warning: translateCallout('warning'),
		tip: translateCallout('tip'),
	};
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
							<h1 className='text-heading-xlarge text-dark tracking-wide dark:text-white'>{post.title}</h1>
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
						<div className='prose-custom'>{post.content.map((block, index) => renderBlock(block, index, translateBlog('codeBlock'), calloutLabels))}</div>
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
