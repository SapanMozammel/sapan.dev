import ApolloWrapper, { makeClient } from '@/lib/apollo/provider';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// `dataMasking` lives on the private `queryManager` — not exposed publicly in Apollo 4.x.
type ClientWithMaskingFlag = {
	queryManager: {
		dataMasking: boolean;
	};
};

describe('apollo conventions', () => {
	it('keeps dataMasking enabled on the browser-side ApolloClient factory', () => {
		const client = makeClient();
		const inspectable = client as unknown as ClientWithMaskingFlag;
		expect(inspectable.queryManager.dataMasking).toBe(true);
	});
});

describe('ApolloWrapper provider', () => {
	let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		consoleErrorSpy.mockRestore();
	});

	it('mounts cleanly and renders its children with no Apollo console errors', () => {
		render(
			<ApolloWrapper>
				<div data-testid='apollo-child'>child</div>
			</ApolloWrapper>,
		);
		expect(screen.getByTestId('apollo-child')).toBeInTheDocument();

		const apolloErrors = consoleErrorSpy.mock.calls.filter((args: unknown[]) => args.some((arg: unknown) => typeof arg === 'string' && /apollo/i.test(arg)));
		expect(apolloErrors).toHaveLength(0);
	});
});
