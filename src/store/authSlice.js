import { createSlice } from '@reduxjs/toolkit';



const initialState = {
	isLoggedIn: false,
	token: null,
	user: null,
	token: {
		tokenType: 'Bearer',
		accessToken:
			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3Mzg1Mjc2NzgsImlhdCI6MTcwNjk5MTY3OCwic3ViIjoiNjViZTIyNmEwNTg5MGMzYjhjZDUwY2NlIn0.1F79dZWy69AP5GLVlE1JAYkG4MVdguHNsHz8mfmVGfs',
		refreshToken:
			'65be226a05890c3b8cd50cce.3e3a498c4e31a0387e4d08081da1812bada6476f2f7cb340b58359dcd0b8530d5e91852b40eda748',
		expiresIn: '2025-02-02T20:21:18.846Z'
	},
	user: {
		id: '65be226a05890c3b8cd50cce',
		email: 'colrium@gmail.com',
		password: '$2a$10$Vh/1AHosp2kBApo86N5R3ebZHWYTmrWdHkG7QPUf.J8I6kUGhisjS',
		firstname: 'Admin',
		lastname: 'Administrator',
		role: 'admin',
		updatedAt: '2024-02-03T11:24:27.091Z',
		createdAt: '2024-02-03T11:24:27.091Z'
	}
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
