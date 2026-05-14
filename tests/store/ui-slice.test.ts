import uiReducer, { closeContactModal, openContactModal } from '@/store/slices/ui-slice';
import { describe, expect, it } from 'vitest';

describe('uiSlice', () => {
	const initialState = { isContactModalOpen: false };

	it('has correct initial state', () => {
		expect(uiReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	it('opens contact modal', () => {
		const state = uiReducer(initialState, openContactModal());
		expect(state.isContactModalOpen).toBe(true);
	});

	it('closes contact modal', () => {
		const openState = { isContactModalOpen: true };
		const state = uiReducer(openState, closeContactModal());
		expect(state.isContactModalOpen).toBe(false);
	});

	it('handles toggle open then close', () => {
		let state = uiReducer(initialState, openContactModal());
		expect(state.isContactModalOpen).toBe(true);
		state = uiReducer(state, closeContactModal());
		expect(state.isContactModalOpen).toBe(false);
	});
});
