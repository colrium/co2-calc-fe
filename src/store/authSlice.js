import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';


const initialState = {
	isLoggedIn: false,
	token: null,
	user: null,
	
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoggedIn(state, action) {
			state.loggedin = action.payload;
			state.isLoggedIn = action.payload;
			if (!action.payload) {
				Cookies.remove('accessToken');
				Cookies.remove('refreshToken');
				Cookies.remove('tokenType');
			}
			
		},
		setAuthUser(state, action) {
			state.user = action.payload;
			// state.loggedin = !!state.user;
		},
		setAuthToken(state, action) {
			state.token = action.payload;
			if (action.payload) {
				const expires = (action.payload?.expiresIn? dayjs(action.payload.expiresIn) : dayjs().add(1, 'day')).toDate();
				Cookies.set('accessToken', action.payload.accessToken);
				Cookies.set('refreshToken', action.payload.refreshToken);
				Cookies.set('tokenType', action.payload.tokenType);
			}
			else {
				Cookies.remove('accessToken');
				Cookies.remove('refreshToken');
				Cookies.remove('tokenType');
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
