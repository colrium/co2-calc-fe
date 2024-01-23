import { useCallback, useReducer, useRef } from 'react';
import useDidUpdate from './useDidUpdate';
const reducer = (state = {}, patch) => {
	let patchValue = typeof patch === 'function' ? patch(state) : patch;
	if (typeof patchValue === 'object') {
		let nextState = Object.assign({}, state, patchValue);
		return nextState;
	}
	return state;
};
const useSetState = (initialState = {}) => {
	const cbRef = useRef();
	const [state, setState] = useReducer(reducer, initialState);

	const patcher = useCallback((patch, cb = null) => {
		cbRef.current = cb;
		setState(patch);
	}, []);

	useDidUpdate(() => {
		if (typeof cbRef.current === 'function') {
			cbRef.current(state);
			cbRef.current = null;
		}
	}, [state]);

	return [state, patcher];
};

export default useSetState;
