import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    isLoggedIn: false,
    token: null,
    user: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoggedIn(state, action) {
			state.loggedin = action.payload;
		},
		setAuthUser(state, action) {
			state.user = action.payload;
			if (!action.payload) {
				state.loggedin = false;
			}
		},
		setAuthToken(state, action) {
			state.token = action.payload;
			if (!action.payload) {
				state.loggedin = false;
			}
		}
	},

	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return {
	// 			...state,
	// 			...action.payload.auth
	// 		};
	// 	}
	// }
});

export const { setLoggedIn, setAuthUser, setAuthToken } = authSlice.actions;

export const selectAuth = (state) => ({...initialState, ...state.auth});

export default authSlice.reducer;
