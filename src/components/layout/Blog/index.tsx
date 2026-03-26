import BlogCard from '@/components/ui/blog-card';
import { BLOG_POSTS } from '@/data/content/blogs';
import { Button } from '../common/Button';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

const Blog = () => (
	<section id='blog' className='relative z-1 pb-8 sm:pb-12 lg:pb-16'>
		<SectionSeparator lts rts lbs rbs tl bl ll rl>
			<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 sm:pb-12 lg:pb-16'>
				<SectionTitle subtitle='Dev Journal' title='Thoughts on Frontend' watermark='Articles' />
				<div className='grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3'>
					{BLOG_POSTS.slice(0, 6).map((post) => (
						<BlogCard key={post.slug} post={post} />
					))}
				</div>
				<div className='mt-4'>
					<Button to='/articles' fill>
						View all articles
					</Button>
				</div>
			</div>
		</SectionSeparator>
	</section>
);

export default Blog;
