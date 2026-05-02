import ThemeSwitcher from '@/components/layout/common/ThemeSwitcher';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('ThemeSwitcher', () => {
	it('exposes an aria-label on the trigger button matching the localized "Change Theme"', () => {
		render(<ThemeSwitcher />);
		expect(screen.getByRole('button', { name: /change theme/i })).toBeInTheDocument();
	});
});
