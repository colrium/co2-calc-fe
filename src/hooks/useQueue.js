/** @format */
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import useSetState from './useSetState';

const initialState = [];

const reducer = (state = initialState, action) => {
	let clone = Array.isArray(state) ? JSON.parse(JSON.stringify(state)) : [];
	switch (action.type) {
		case 'enqueue':
			const nextState = state.concat(Array.isArray(action.payload) ? action.payload : [action.payload]);

			return nextState;
		case 'dequeue':
			if (state.length > 0) {
				if (Array.isArray(action?.payload)) {
					action.payload.forEach((payloadIndex) => {
						state.splice(payloadIndex > -1 && payloadIndex < state.length ? payloadIndex : 0, 1);
					});
				} else {
					const index = action?.payload > -1 && action?.payload < state.length ? action?.payload : 0;
					state.splice(index, 1);
				}
			}
			return [...state];
		case 'set':
			return Array.isArray(action.payload) ? action.payload : state;
		default:
			return state;
	}
};

const defaultOptions = { auto: false, watchValue: false, clearOnUnmount: true };
const useQueue = (value = [], options = {}) => {
	const { auto, clearOnUnmount } = { ...defaultOptions, ...options };
	const isMountedRef = useRef(false);
	const processedRef = useRef([]);
	const [queue, dispatch] = useReducer(reducer, Array.isArray(value) ? value : []);
	const [state, setState] = useSetState({
		running: false,
		processed: []
	});
	const start = () => setState({ running: true });
	const stop = () => setState({ running: false });
	const updateQueue = (action) => {
		if (isMountedRef.current) {
			return dispatch(action);
		}
		return;
	};
	const enqueue = useCallback(
		(entry) => {
			updateQueue({ type: 'enqueue', payload: entry });
			if (auto && !state?.running) {
				start();
			}
		},
		[state?.running]
	);
	const dequeue = (index) => updateQueue({ type: 'dequeue', payload: index });
	const first = useCallback(() => queue[0], [queue]);
	const last = useCallback(() => queue[queue.length - 1], [queue]);
	const clear = () => updateQueue({ type: 'set', payload: [] });
	const current = useMemo(() => (Array.isArray(queue) ? queue[0] : undefined), [queue?.length]);
	const next = () => dequeue(-1);

	useEffect(() => {
		if (clearOnUnmount) {
			return () => clear();
		}
	}, [clearOnUnmount]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (queue?.length > 0) {
			// const cursor = queue.length;
			if (state.running) {
				Promise.all([typeof current === 'function' ? current() : current]).then((res) => {
					processedRef.current = processedRef.current.concat(res);
					if (auto) {
						dequeue();
					}
				});
			} else if (auto) {
				start();
			}
		} else if (queue?.length === 0 && state.running && auto) {
			stop();
		}
	}, [state.running, queue?.length]);

	return [
		current,
		{
			next,
			enqueue,
			dequeue,
			state,
			first,
			last,
			clear,
			start,
			stop,
			length: Array.isArray(queue) ? queue.length : 0,
			processed: processedRef.current
		}
	];
};

export default useQueue;
