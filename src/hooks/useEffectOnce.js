import { useEffect, useRef } from 'react';
import { debounce } from 'throttle-debounce';
import useLiveRef from './useLiveRef';

const useEffectOnce = (effect, options = {}) => {
	const mountedRef = useRef(false);
	const effectRef = useLiveRef(effect);
	// Short duration Debounce to get rid of useEffects double invocation
	const didMount = debounce(50, () => {
		let cleanup = () => {
			mountedRef.current = false;
		};
		if (!mountedRef.current) {
			mountedRef.current = true;
			const effectCleanup = effectRef.current();

			if (typeof effectCleanup === 'function') {
				cleanup = () => {
					mountedRef.current = false;
					effectCleanup();
				};
			}
		}
		return cleanup;
	});

	useEffect(didMount, []);
};

export default useEffectOnce;
