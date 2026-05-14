import GitHubLink from '@/components/layout/header/github-link';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('GitHubLink', () => {
	it('exposes an aria-label on the anchor matching the localized "View on GitHub"', () => {
		render(<GitHubLink />);
		expect(screen.getByRole('link', { name: /view on github/i })).toBeInTheDocument();
	});
});
