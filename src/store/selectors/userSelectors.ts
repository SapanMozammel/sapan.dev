import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Basic selectors
export const selectUserState = (state: RootState) => state.user;
export const selectUsers = (state: RootState) => state.user.users;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// Memoized selectors using createSelector
export const selectIsLoading = createSelector([selectUserLoading], (loading) => loading === 'pending');

export const selectHasError = createSelector([selectUserError], (error) => error !== null);

export const selectUserCount = createSelector([selectUsers], (users) => users.length);

export const selectUserById = (userId: number) => createSelector([selectUsers], (users) => users.find((user) => user.id === userId));

export const selectUsersByDomain = (domain: string) => createSelector([selectUsers], (users) => users.filter((user) => user.email.endsWith(`@${domain}`)));
