'use client';

import SectionSeparator from '@/components/layout/common/section-separator';
import SectionTitle from '@/components/layout/common/section-title';
import BlogCard from '@/components/ui/blog-card';
import { BLOG_POSTS, BLOGS_PER_PAGE } from '@/data/content/blogs';
import { cn } from '@/lib/utils';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { memo, useMemo, useState } from 'react';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

const BlogPage = memo(() => {
	const translate = useTranslations('home.blog');
	const translatePagination = useTranslations('blog.pagination');
	const [activeCategory, setActiveCategory] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);

	const filtered = useMemo(() => (activeCategory === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === activeCategory)), [activeCategory]);

	const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE);
	const paginated = filtered.slice((currentPage - 1) * BLOGS_PER_PAGE, currentPage * BLOGS_PER_PAGE);

	const handleCategory = (cat: string) => {
		setActiveCategory(cat);
		setCurrentPage(1);
	};

	return (
		<section className='relative z-1 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pb-32'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex grow flex-col items-center justify-start gap-4'>
					<SectionTitle subtitle={translate('subtitle')} title={translate('title')} watermark='Articles' />
					<div className='mb-4 flex w-full flex-wrap justify-center gap-2'>
						{ALL_CATEGORIES.map((cat) => (
							<button
								key={cat}
								onClick={() => handleCategory(cat)}
								className={cn(
									'font-hg cursor-pointer rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200',
									activeCategory === cat
										? 'border-primary bg-primary dark:border-success dark:bg-success dark:text-dark text-white'
										: 'border-secondary-300 text-secondary-600 dark:text-secondary-400 hover:border-secondary-400 dark:border-secondary-700 dark:hover:border-secondary-600 hover:text-dark dark:hover:text-white'
								)}
							>
								{cat === 'All' ? translate('allCategories') : cat}
							</button>
						))}
					</div>
					<div className='grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3'>
						{paginated.map((post) => (
							<BlogCard key={post.slug} post={post} />
						))}
					</div>
					{totalPages > 1 && (
						<div className='mt-4 flex items-center gap-2'>
							<button
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								disabled={currentPage === 1}
								className='border-secondary-300 text-secondary-600 dark:text-secondary-400 hover:border-primary hover:text-primary dark:border-secondary-700 dark:hover:border-success dark:hover:text-success flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 disabled:pointer-events-none disabled:opacity-40'
								aria-label={translatePagination('previous')}
							>
								<IconChevronLeft size={16} stroke={2} />
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
								<button
									key={page}
									onClick={() => setCurrentPage(page)}
									className={cn(
										'font-hg h-9 w-9 cursor-pointer rounded-lg border text-xs font-bold transition-all duration-200',
										currentPage === page
											? 'border-primary bg-primary dark:border-success dark:bg-success dark:text-dark text-white'
											: 'border-secondary-300 text-secondary-600 dark:text-secondary-400 hover:border-primary hover:text-primary dark:border-secondary-700 dark:hover:border-success dark:hover:text-success'
									)}
									aria-label={translatePagination('page', { page })}
									aria-current={currentPage === page ? 'page' : undefined}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
								disabled={currentPage === totalPages}
								className='border-secondary-300 text-secondary-600 dark:text-secondary-400 hover:border-primary hover:text-primary dark:border-secondary-700 dark:hover:border-success dark:hover:text-success flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 disabled:pointer-events-none disabled:opacity-40'
								aria-label={translatePagination('next')}
							>
								<IconChevronRight size={16} stroke={2} />
							</button>
						</div>
					)}
				</div>
			</SectionSeparator>
		</section>
	);
});

BlogPage.displayName = 'BlogPage';

export default BlogPage;
