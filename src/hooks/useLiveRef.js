import { useRef } from 'react';

/**
 * Custom hook that creates a ref object with the current value.
 * The ref object is updated with the new value on each render.
 *
 * @param {*} val - The value to be stored in the ref object.
 * @returns {object} - The ref object with the current value.
 */
const useLiveRef = (val) => {
	const ref = useRef(val); // Initialize the ref with the initial value
	ref.current = val; // Update the ref with the new value on each render
	return ref; // Return the ref object
};

export default useLiveRef;
