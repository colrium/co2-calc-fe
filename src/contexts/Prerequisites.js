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
			external: isMobile,
			internal:  isMobile,
			calcLeft:  !isMobile,
			calcRight:  !isMobile,
		},
		
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
		(function () {
			var addEvent = function (el, type, fn) {
				if (el.addEventListener) el.addEventListener(type, fn, false);
				else el.attachEvent('on' + type, fn);
			};

			var extend = function (obj, ext) {
				for (var key in ext) if (ext.hasOwnProperty(key)) obj[key] = ext[key];
				return obj;
			};

			window.fitText = function (el, kompressor, options) {
				var settings = extend(
					{
						minFontSize: -1 / 0,
						maxFontSize: 1 / 0
					},
					options
				);

				var fit = function (el) {
					var compressor = kompressor || 1;

					var resizer = function () {
						el.style.fontSize =
							Math.max(
								Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)),
								parseFloat(settings.minFontSize)
							) + 'px';
					};

					// Call once to set.
					resizer();

					// Bind events
					// If you have any js library which support Events, replace this part
					// and remove addEvent function (or use original jQuery version)
					addEvent(window, 'resize', resizer);
					addEvent(window, 'orientationchange', resizer);
				};

				if (el.length) for (var i = 0; i < el.length; i++) fit(el[i]);
				else fit(el);

				// return set of elements
				return el;
			};
		})();
		axios.interceptors.request.use(onAxiosRequestInterceptor, onAxiosRequestError);
		axios.interceptors.response.use(onAxiosResponseInterceptor, onAxiosResponseError);
	}, []);

    useUniqueEffect(() => {
        if (router.pathname?.startsWith('/dashboard') && !loggedinRef.current) {
            router.push('/auth/login')
		}
		else if (loggedinRef.current && !router.pathname?.startsWith('/dashboard')) {
			// router.push('/dashboard/overview');
		}
    }, [router.pathname]);

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
				drawerVariant: isMobile ? 'temporary' : 'persistent'
			}}
		>
			{children}
		</PrerequisitesContext.Provider>
	);
};


export default PrerequisitesProvider;
