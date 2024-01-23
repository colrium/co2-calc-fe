import { deepEqual } from '@/util';
import { useRef, useState } from 'react';

const useMutationsCount = (deps) => {
	const [updateCounts, setUpdateCounts] = useState(0);
	const depsRef = useRef(deps);
	const countRef = useRef(0);
	const hasMutated = !deepEqual(depsRef.current, deps);
	if (hasMutated) {
		countRef.current++;
		depsRef.current = deps;
	}
	return countRef.current;
};

export default useMutationsCount;
