import DownloadResumeButton from '@/components/layout/common/download-resume-button';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('DownloadResumeButton', () => {
	it('renders the Download Resume label from translations', () => {
		render(<DownloadResumeButton />);
		expect(screen.getByText('Download Resume')).toBeInTheDocument();
	});

	it('renders an anchor pointing at the resume PDF', () => {
		render(<DownloadResumeButton />);
		const link = screen.getByText('Download Resume').closest('a');
		expect(link).toHaveAttribute('href', '/resume/Sapan-Mozammel-Frontend-Developer-resume-3.pdf');
	});

	it('sets a download filename via the download attribute', () => {
		render(<DownloadResumeButton />);
		const link = screen.getByText('Download Resume').closest('a');
		expect(link).toHaveAttribute('download', 'Sapan-Mozammel-Frontend-Developer.pdf');
	});
});
