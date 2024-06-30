import { useEffectOnce, useLiveRef, useSetState, useUniqueEffect } from '@/hooks';
import { selectAuth, setAuthToken, setAuthUser, setLoggedIn } from '@/store/authSlice';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotifications } from './Notifications';




export const PrerequisitesContext = createContext({});

export const usePrerequisites = () => {
	const context = useContext(PrerequisitesContext);
	return context;
};



const PrerequisitesProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { token, user } = useSelector(selectAuth);
    const [, {appendNotification}] = useNotifications();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [state, setState] = useSetState({
		openDrawers: {
			external: false,
			internal: false,
			calcLeft: !isMobile,
			calcRight: !isMobile
		},
		formik: null
	});
    const router = useRouter();
	const tokenType = Cookies.get('tokenType');
	const refreshToken = Cookies.get('refreshToken');
	const accessToken = Cookies.get('accessToken');
	const loggedin = !!accessToken && !!user
	const loggedinRef = useLiveRef(loggedin);

	const toggleDrawer = (name, open = false) => {
		if (name) {
			setState((prev) => {
				const newValue = open ? open : !prev.openDrawers[name];
				return {
					openDrawers: {
						...prev.openDrawers,
						calcLeft:
							name === 'internal' && newValue && prev.openDrawers.calcLeft ? false : prev.openDrawers.calcLeft,
						internal:
							name === 'calcLeft' && newValue && prev.openDrawers.internal ? false : prev.openDrawers.internal,
						[name]: newValue
					}
				};
		});
		}
	};
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
		if (loggedin && !router.pathname?.startsWith('/dashboard')) {
			router.push('/dashboard/overview');
		}
	}, []);

    useUniqueEffect(() => {
		if (loggedinRef.current && router.pathname.startsWith('/dashboard')) {
			if ( router.pathname === '/dashboard/calculations' && router.query && 'id' in router.query) {
				setState((prev) => ({ openDrawers: { ...prev.openDrawers, internal: false, calcLeft: !isMobile }}));
			}
			else {
				setState((prev) => ({ openDrawers: { ...prev.openDrawers, internal: !isMobile, calcLeft: false }}));
			}
		}
	}, [router.pathname, router.query]);

	useUniqueEffect(() => {
		if (!loggedin) {
			dispatch(setLoggedIn(false));
			dispatch(setAuthToken(null));
			dispatch(setAuthUser(null));
		}
	}, [loggedin]);


	return (
		<PrerequisitesContext.Provider
			value={{
				...state,
				loggedin,
				token: { accessToken, tokenType, refreshToken },
				toggleDrawer,
				drawerVariant: isMobile ? 'temporary' : 'persistent',
				patch: setState
			}}
		>		
			{children}
		</PrerequisitesContext.Provider>
	);
};


export default PrerequisitesProvider;
