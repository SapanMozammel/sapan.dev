import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Register custom `text-{heading|body|label}-*` utilities (defined in `utilities.scss`) under tailwind-merge's font-size group so cn() doesn't strip them as text-color conflicts. New tiers need no change here; new categories require extending the regex.
const TYPOGRAPHY_PRESET_PATTERN = /^(heading|body|label)-/;

const twMerge = extendTailwindMerge({
	extend: {
		theme: {
			text: [(value: string) => TYPOGRAPHY_PRESET_PATTERN.test(value)],
		},
	},
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
