import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User type
export type User = {
	id: number;
	name: string;
	email: string;
	username: string;
	phone: string;
	website: string;
};

// Define the state shape
export type UserState = {
	users: User[];
	currentUser: User | null;
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string | null;
};

// Initial state
const initialState: UserState = {
	users: [],
	currentUser: null,
	loading: 'idle',
	error: null,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();
	return data as User[];
});

// Async thunk for fetching a single user by ID
export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId: number) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
	const data = await response.json();
	return data as User;
});

// Create the slice
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// Synchronous actions
		setCurrentUser: (state, action: PayloadAction<User | null>) => {
			state.currentUser = action.payload;
		},
		clearUsers: (state) => {
			state.users = [];
			state.currentUser = null;
			state.loading = 'idle';
			state.error = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		// Handle fetchUsers
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = 'pending';
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = 'failed';
				state.error = action.error.message || 'Failed to fetch users';
			});

		// Handle fetchUserById
		builder
			.addCase(fetchUserById.pending, (state) => {
				state.loading = 'pending';
				state.error = null;
			})
			.addCase(fetchUserById.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.currentUser = action.payload;
			})
			.addCase(fetchUserById.rejected, (state, action) => {
				state.loading = 'failed';
				state.error = action.error.message || 'Failed to fetch user';
			});
	},
});

// Export actions
export const { setCurrentUser, clearUsers, clearError } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
