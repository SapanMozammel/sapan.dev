import { configureStore } from '@reduxjs/toolkit';
import { localeReducer, userReducer } from './slices';

// Create the store with reducers
export const store = configureStore({
	reducer: {
		user: userReducer,
		locale: localeReducer,
	},
	// Redux Thunk is included by default in Redux Toolkit
	// Additional middleware can be added here if needed
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types for serializable check if needed
				ignoredActions: [],
				// Ignore these field paths in all actions
				ignoredActionPaths: [],
				// Ignore these paths in the state
				ignoredPaths: [],
			},
		}),
	devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
