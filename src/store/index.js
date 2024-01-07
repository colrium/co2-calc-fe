import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './authSlice';

const rootReducer = combineReducers({
	[authSlice.name]: authSlice.reducer
});

const makeConfiguredStore = () =>
	configureStore({
		reducer: rootReducer,
		devTools: true
	});

export const makeStore = () => {
	const isServer = typeof window === 'undefined';

	if (isServer) {
		return makeConfiguredStore();
	} else {
		// we need it only on client side

		const persistConfig = {
			key: 'ghg-calc',
			whitelist: ['auth'], // make sure it does not clash with server keys
			storage
		};

		const persistedReducer = persistReducer(persistConfig, rootReducer);
		let store = configureStore({
			reducer: persistedReducer,
			devTools: process.env.NODE_ENV !== 'production'
		});

		store.__persistor = persistStore(store); // Nasty hack

		return store;
	}
};


export const wrapper = createWrapper(makeStore);
