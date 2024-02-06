import { useEffectOnce, useLiveRef, useUniqueEffect } from '@/hooks';
import { selectAuth } from '@/store/authSlice';
import Grow from '@mui/material/Grow';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useCallback } from 'react';
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



const PrerequisitesProvider = ({ children }) => {
    
    const { loggedin, token } = useSelector(selectAuth);
    const [, {appendNotification}] = useNotifications();
    const loggedinRef = useLiveRef(loggedin);
    const router = useRouter();
    const onAxiosRequestInterceptor = useCallback((req) => {
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
	}, [loggedin])
	const onAxiosRequestError = (error) => {
		let msg = `Request  failed with status  ${error?.status || 400} :  ${error?.statusText || 'Something went wrong'}`;
		appendNotification({
			message: msg,
			severity: 'error'
		});
		return Promise.reject(error);
	};
	
	const onAxiosResponseInterceptor = (response) => {
		if (response.status >= 400) {
			const {data} = response;
			
			const { code, errors, message } = {...data};
			let msg = `Request rejected with status  ${error?.status || code || 500} :  ${
				message || error?.statusText || 'Internal Server'
			}`;
			
			if (response.status === 401) {
				msg = `Request rejected with status 401: Unauthorized. Please ensure you are logged in`;
			}
			else {
				if (message) {
					msg = message;
				} else if (errors?.length > 0) {
					msg = errors.reduce((acc, curr) => `${acc} ${curr?.messages?.join?.('\n')}`, msg);
				} 
			}
            
			appendNotification({
				message: msg,
				severity: 'error'
			});
			return Promise.reject(new Error(msg));
		}
		return response
	};

	const onAxiosResponseError = (error) => {
		let msg = `Request  failed with status  ${error?.response?.status || 400} :  ${error?.statusText || 'Something went wrong'}`;
		appendNotification({
			message: msg,
			severity: 'error'
		});
		return Promise.reject(error);
	};
    

	useEffectOnce(() => {
		axios.interceptors.request.use(onAxiosRequestInterceptor, onAxiosRequestError);
		axios.interceptors.response.use(onAxiosResponseInterceptor, onAxiosResponseError);
	}, []);

    useUniqueEffect(() => {
        if (router.pathname?.startsWith('/dashboard') && !loggedinRef.current) {
            router.push('/auth/login')
		}
    }, [router.pathname])

	return <PrerequisitesContext.Provider value={{ loggedin, token }}>{children}</PrerequisitesContext.Provider>;
};


export default PrerequisitesProvider;
