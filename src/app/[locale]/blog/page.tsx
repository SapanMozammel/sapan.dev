'use client';

import SectionSeparator from '@/components/layout/common/SectionSeparator';
import SectionTitle from '@/components/layout/common/SectionTitle';
import BlogCard from '@/components/ui/blog-card';
import { BLOG_POSTS, BLOGS_PER_PAGE } from '@/data/content/blogs';
import { cn } from '@/lib/utils';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { memo, useMemo, useState } from 'react';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

const BlogPage = memo(() => {
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
		<section className='relative z-1 pb-8 sm:pb-12 lg:pb-16'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 sm:pb-12 lg:pb-16'>
					<SectionTitle subtitle='Dev Journal' title='Thoughts on Frontend' watermark='Articles' />
					<div className='mb-4 flex w-full flex-wrap justify-center gap-2'>
						{ALL_CATEGORIES.map((cat) => (
							<button
								key={cat}
								onClick={() => handleCategory(cat)}
								className={cn(
									'font-sora cursor-pointer rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200',
									activeCategory === cat
										? 'border-primary bg-primary dark:border-success dark:bg-success text-white dark:text-black'
										: 'border-secondary-300 text-secondary-500 hover:border-secondary-400 dark:border-secondary-600 dark:hover:border-secondary-500 hover:text-black dark:hover:text-white'
								)}
							>
								{cat}
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
								className='border-secondary-300 text-secondary-500 hover:border-primary hover:text-primary dark:border-secondary-600 dark:hover:border-success dark:hover:text-success flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 disabled:pointer-events-none disabled:opacity-40'
								aria-label='Previous page'
							>
								<IconChevronLeft size={16} stroke={2} />
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
								<button
									key={page}
									onClick={() => setCurrentPage(page)}
									className={cn(
										'font-sora h-9 w-9 cursor-pointer rounded-lg border text-xs font-bold transition-all duration-200',
										currentPage === page
											? 'border-primary bg-primary dark:border-success dark:bg-success text-white dark:text-black'
											: 'border-secondary-300 text-secondary-500 hover:border-primary hover:text-primary dark:border-secondary-600 dark:hover:border-success dark:hover:text-success'
									)}
									aria-label={`Page ${page}`}
									aria-current={currentPage === page ? 'page' : undefined}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
								disabled={currentPage === totalPages}
								className='border-secondary-300 text-secondary-500 hover:border-primary hover:text-primary dark:border-secondary-600 dark:hover:border-success dark:hover:text-success flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 disabled:pointer-events-none disabled:opacity-40'
								aria-label='Next page'
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
