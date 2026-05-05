import Blog from '@/components/layout/blog';
import { BLOG_POSTS, BLOGS_PER_PAGE } from '@/data/content/blogs';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('Blog', () => {
	it('renders within a section element with id="blog"', async () => {
		const { container } = render(await Blog());
		const section = container.querySelector('section#blog');
		expect(section).toBeInTheDocument();
	});

	it('renders the section title', async () => {
		render(await Blog());
		expect(screen.getByText('Thoughts on Frontend')).toBeInTheDocument();
	});

	it('renders the first 6 blog posts (BLOGS_PER_PAGE)', async () => {
		render(await Blog());
		const firstPosts = BLOG_POSTS.slice(0, BLOGS_PER_PAGE);
		firstPosts.forEach((post) => {
			expect(screen.getByText(post.title)).toBeInTheDocument();
		});
	});

	it('does not render posts beyond the first 6', async () => {
		render(await Blog());
		const beyondPosts = BLOG_POSTS.slice(BLOGS_PER_PAGE);
		if (beyondPosts.length > 0) {
			const seventhTitle = beyondPosts[0]!.title;
			expect(screen.queryByText(seventhTitle)).not.toBeInTheDocument();
		}
	});

	it('renders the View all articles link to /articles', async () => {
		render(await Blog());
		const viewAllLink = screen.getByText('View all articles').closest('a');
		expect(viewAllLink).toHaveAttribute('href', '/articles');
	});
});
