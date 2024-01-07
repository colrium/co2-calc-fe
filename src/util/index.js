/** @format */

const hasElementType = typeof Element !== 'undefined';
const hasMap = typeof Map === 'function';
const hasSet = typeof Set === 'function';
const hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;
export const deepEqual = (a, b) => {
	if (a === b) return true;

	if (a && b && typeof a == 'object' && typeof b == 'object') {
		if (a.constructor !== b.constructor) return false;

		let length, i, keys;
		if (Array.isArray(a)) {
			length = a.length;
			if (length != b.length) return false;
			for (i = length; i-- !== 0; ) if (!deepEqual(a[i], b[i])) return false;
			return true;
		}
		let it;
		if (hasMap && a instanceof Map && b instanceof Map) {
			if (a.size !== b.size) return false;
			it = a.entries();
			while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
			it = a.entries();
			while (!(i = it.next()).done) if (!deepEqual(i.value[1], b.get(i.value[0]))) return false;
			return true;
		}
		if (a instanceof File || b instanceof File) {
			return a?.name === b?.name && a?.size === b?.size;
		}

		if (hasSet && a instanceof Set && b instanceof Set) {
			if (a.size !== b.size) return false;
			it = a.entries();
			while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
			return true;
		}
		if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
			length = a.length;
			if (length != b.length) return false;
			for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false;
			return true;
		}

		if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
		if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
		if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

		keys = Object.keys(a);
		length = keys.length;
		if (length !== Object.keys(b).length) return false;

		for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
		if (hasElementType && a instanceof Element) return false;
		for (i = length; i-- !== 0; ) {
			if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
				continue;
			}
			if (!deepEqual(a[keys[i]], b[keys[i]])) return false;
		}
		return true;
	}

	return a !== a && b !== b;
};
