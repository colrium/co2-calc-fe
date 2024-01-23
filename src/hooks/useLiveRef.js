import { useRef } from 'react';

const useLiveRef = (val) => {
	const ref = useRef(val);
	ref.current = val;
	return ref;
};

export default useLiveRef;
