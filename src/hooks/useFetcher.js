import { selectAuth } from "@/store/authSlice";

const { useCallback } = require("react");
const { useSelector } = require("react-redux");

const useFetcher = () => {
    const { loggedin, token } = useSelector(selectAuth);
    const fetcher = useCallback(
		(url, { body, ...options } = {}) => {
			return fetch(url, {
				...options,
				...(body ? { body: JSON.stringify(body) } : {}),
				headers: {
					Authorization: `${token?.tokenType || 'Bearer'} ${token?.accessToken || ''}`,
					'Content-Type': 'application/json'
				}
			});
		},
		[token, loggedin]
	);
	return fetcher;
}

export default useFetcher;