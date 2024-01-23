import useDidUpdate from './useDidUpdate';
import useEffectOnce from './useEffectOnce';
import useLiveRef from './useLiveRef';
const useUniqueEffect = (effect, deps) => {
	const effectRef = useLiveRef(effect);
	useEffectOnce(effectRef.current);
	useDidUpdate(effectRef.current, [deps]);
};
export default useUniqueEffect;
