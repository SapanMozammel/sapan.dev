import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { LOCALE_STORAGE_KEY, localeReducer } from './slices';
import { setLocale } from './slices/localeSlice';

const listenerMiddleware = createListenerMiddleware();

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
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
