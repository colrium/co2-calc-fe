const { useCallback } = require("react");
const { useSelector } = require("react-redux");

const useFetcher = () => {
    const { isLoggedIn, token } = useSelector((storeState) => storeState.auth);
    const fetcher = useCallback(
		(url, {body, ...options} ={}) => {
			return fetch(url, {
				...options,
				...(body? {body: JSON.stringify(body)} : {}),
				headers: { Authorization: `${token?.tokenType || 'Bearer'} ${token?.accessToken || ''}`, 'Content-Type': 'application/json' }
			});
		},
		[token, isLoggedIn]
	);
	return fetcher;
}

export default useFetcher;