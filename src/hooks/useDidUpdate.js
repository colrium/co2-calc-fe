import { useEffect } from 'react';
import useLiveRef from './useLiveRef';
import useMutationsCount from './useMutationsCount';
const useDidUpdate = (effect, deps) => {
	const mutationCount = useMutationsCount(deps);
	const effectRef = useLiveRef(effect);
	useEffect(() => {
		if (mutationCount > 0) {
			return effectRef.current();
		}
	}, [mutationCount]);
};

export default useDidUpdate;
