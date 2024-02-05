import { useLiveRef, useUniqueEffect } from '@/hooks';
import { selectAuth } from '@/store/authSlice';
import Grow from '@mui/material/Grow';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNotifications } from './Notifications';
const GrowTransition = (props) => {
	return <Grow {...props} />;
};
export const PrerequisitesContext = createContext({});

export const usePrerequisites = () => {
	const context = useContext(PrerequisitesContext);
	return context;
};
let actualFetch;
/* 
const monkeyPatchFetch = ({interceptor}) => { 
    actualFetch = actualFetch || window?.fetch;
    window.fetch = new Proxy(actualFetch, {
			apply(actualFetch, that, args) {
				
                const {loggedin, token} = interceptor(args);
                const { body, ...options } = args[1] || {};
				if (loggedin) {
					args[1] = {
						...args[1],
						headers: {
							Authorization: `${token?.tokenType || 'Bearer'} ${token?.accessToken || ''}`,
							...args[1]?.headers
						}
					};
				}
				try {
					args[1] = {
						...args[1],
						headers: {
							'Content-Type': 'application/json',
							...args[1]?.headers
						},
						...(body ? { body: body.constructor === {}.constructor ? JSON.stringify(body) : body } : {})
					};
				} catch (error) {}
				const [resource, config] = args;

				try {
					// Forward function call to the original fetch
					const result = Reflect.apply(actualFetch, that, args);

					//
					result.then((response) => {
						const res = response.clone();
						if (res?.url?.includes?.('__nextjs_original-stack-frame')) {
							const hotReloadEvent = new CustomEvent('hot-reload', {
								bubbles: true,
								detail: { response: res, resource, config }
							});
							window.dispatchEvent(hotReloadEvent);
							if (res.status >= 400) {
								throw new Error(res);
							}
						} else {
							const eventFetchResponse = new CustomEvent('fetch-response', {
								bubbles: true,
								detail: { response: res, resource, config }
							});
							window.dispatchEvent(eventFetchResponse);
						}
					});

					return result;
				} catch (error) {
					console.error(`fetch ${resource} failed with error`, error);
				}
			}
		});
} */

axios.interceptors.request.use(
	(req) => {
		 
		if (Cookies.get('accessToken')) {
			return {
				...req,
				headers: {
					...req.headers,
					Authorization: `${Cookies.get('tokenType')} ${Cookies.get('accessToken')}`
				}
			};
		}
		return req;

	},
	(err) => err
);

const PrerequisitesProvider = ({ children }) => {
    
    const { loggedin, token } = useSelector(selectAuth);
    const [, {appendNotification}] = useNotifications();
    const loggedinRef = useLiveRef(loggedin);
    const router = useRouter();
    
    
	const onFetchResponse = async (event) => {
        const {config, resource, response} = event.detail || {};
        if (response?.status >= 400) {
			const res = response.clone();
			const { code, errors, message } = await res.json();
			let msg = `Request to ${resource} failed with status  ${response.status} :  ${response.statusText}`;
            if (message) {
                msg = message
                appendNotification({
					message: msg,
					severity: 'error'
				});
			} else if (errors?.length > 0) {
				msg = errors.reduce((acc, curr) => `${acc} ${curr?.messages?.join?.('\n')}`, msg);
				appendNotification({
					message: msg,
					severity: 'error'
				});
			} else {
				appendNotification({
					message: msg,
					severity: 'error'
				});
			}
			
		}
        
        
    };
    // const ref = useState(monkeyPatchFetch({ loggedin, token }));

	useLayoutEffect(() => {
		// monkeyPatchFetch({ interceptor: () => ({loggedin, token}) });
		window.addEventListener('fetch-response', onFetchResponse);
	}, [loggedin]);

    useUniqueEffect(() => {
        if (router.pathname?.startsWith('/dashboard') && !loggedinRef.current) {
            router.push('/auth/login')
		}
    }, [router.pathname])

	return <PrerequisitesContext.Provider value={{ loggedin, token }}>{children}</PrerequisitesContext.Provider>;
};


export default PrerequisitesProvider;
