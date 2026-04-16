import SectionTitle from '@/components/layout/common/SectionTitle';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('SectionTitle', () => {
	it('renders title text', () => {
		render(<SectionTitle title='Test Title' />);
		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
	});

	it('renders subtitle when provided', () => {
		render(<SectionTitle title='Title' subtitle='Sub' />);
		expect(screen.getByText('Sub')).toBeInTheDocument();
	});

	it('does not render subtitle when not provided', () => {
		const { container } = render(<SectionTitle title='Title' />);
		expect(container.querySelector('h5')).toBeNull();
	});

	it('renders watermark when provided', () => {
		render(<SectionTitle title='Title' watermark='BG' />);
		const watermark = screen.getByText('BG');
		expect(watermark).toHaveAttribute('aria-hidden', 'true');
	});

	it('does not render watermark when not provided', () => {
		const { container } = render(<SectionTitle title='Title' />);
		expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
	});

	it('applies custom className', () => {
		const { container } = render(<SectionTitle title='Title' className='custom-class' />);
		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('uses different padding when watermark is present', () => {
		const { container } = render(<SectionTitle title='Title' subtitle='Sub' watermark='WM' />);
		const subtitle = container.querySelector('h5');
		expect(subtitle?.className).toContain('pt-[10vw]');
	});

	it('uses smaller padding when no watermark', () => {
		const { container } = render(<SectionTitle title='Title' subtitle='Sub' />);
		const subtitle = container.querySelector('h5');
		expect(subtitle?.className).toContain('pt-[2vw]');
	});
});
