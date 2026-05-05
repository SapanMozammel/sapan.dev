import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import localeReducer, { LOCALE_STORAGE_KEY, setLocale } from './slices/locale-slice';
import uiReducer from './slices/ui-slice';

const listenerMiddleware = createListenerMiddleware();

// Persist locale to localStorage on setLocale dispatch — middleware (not store.subscribe()) so it runs once per action and stays out of the render path.
listenerMiddleware.startListening({
	actionCreator: setLocale,
	effect: (action) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(LOCALE_STORAGE_KEY, action.payload);
		}
	},
});

export const store = configureStore({
	reducer: {
		locale: localeReducer,
		ui: uiReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
