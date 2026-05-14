import { createSlice } from '@reduxjs/toolkit';

type UIState = {
	isContactModalOpen: boolean;
};

const initialState: UIState = {
	isContactModalOpen: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openContactModal: (state) => {
			state.isContactModalOpen = true;
		},
		closeContactModal: (state) => {
			state.isContactModalOpen = false;
		},
	},
});

export const { openContactModal, closeContactModal } = uiSlice.actions;
export default uiSlice.reducer;
