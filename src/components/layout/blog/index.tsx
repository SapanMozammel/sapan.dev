import { Button } from '@/components/layout/common/button';
import SectionSeparator from '@/components/layout/common/section-separator';
import SectionTitle from '@/components/layout/common/section-title';
import BlogCard from '@/components/ui/blog-card';
import { BLOG_POSTS } from '@/data/content/blogs';
import { getTranslations } from 'next-intl/server';

const Blog = async () => {
	const translate = await getTranslations('home.blog');

	return (
		<section id='blog' className='relative z-1 pb-16 sm:pb-24 lg:pb-32'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex grow flex-col items-center justify-start gap-4'>
					<SectionTitle subtitle={translate('subtitle')} title={translate('title')} watermark='Articles' />
					<div className='grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3'>
						{BLOG_POSTS.slice(0, 6).map((post) => (
							<BlogCard key={post.slug} post={post} />
						))}
					</div>
					<div className='mt-4'>
						<Button to='/articles' fill>
							{translate('viewAll')}
						</Button>
					</div>
				</div>
			</SectionSeparator>
		</section>
	);
};

export default Blog;
