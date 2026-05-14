import LanguageSwitcher from '@/components/layout/common/language-switcher';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('LanguageSwitcher', () => {
	it('exposes an aria-label on the trigger button matching the localized "Change Language"', () => {
		render(<LanguageSwitcher />);
		expect(screen.getByRole('button', { name: /change language/i })).toBeInTheDocument();
	});
});
