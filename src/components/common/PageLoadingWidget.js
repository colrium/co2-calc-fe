import { selectAuth } from '@/store/authSlice';
import { Backdrop, CircularProgress, LinearProgress } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Router from 'next/router';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const AuthChangeWidget = memo(({open, sx, children, ...rest}) => {
	const theme = useTheme();
	return (
		<Backdrop
			sx={{
				color: (theme) => theme.palette.tertiary.main,
				zIndex: (theme) => theme.zIndex.drawer + 1,
				backgroundColor: `${alpha(theme.palette.background.dark, 0.05)} !important`,
				WebkitBackdropFilter: [`blur(${theme.spacing()})`, `blur(${theme.spacing()})`],
				backdropFilter: `blur(${theme.spacing()})`,
				backgroundImage: `linear-gradient(${alpha(theme.palette.background.main, 0.05)}, ${alpha(
					theme.palette.background.dark,
					0.1
				)})`,
				...sx
			}}
			{...rest}
		>
			<CircularProgress size={32} color="inherit" />
			{children}
		</Backdrop>
	);
})
const PageChangeWidget = memo(({ open, sx, children, ...rest }) =>
	open && <LinearProgress color="tertiary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ...sx }} {...rest} />);
const PageLoadingWidget = () => {
	const [loading, setLoading] = useState(false);
	const {loggedin} = useSelector(selectAuth)
	const loggedinRef = useRef(loggedin);
	const theme = useTheme();
	const Indicator = useMemo(() => {
		if (loggedinRef.current !== loggedin) {
			loggedinRef.current = loggedin;
			return AuthChangeWidget;
		}
		return PageChangeWidget;
	}, [loggedin]);
	
	useEffect(() => {
		const handleRouteChangeStart = () => setLoading(true);
		const handleRouteChangeComplete = () => setLoading(false);

		Router.events.on('routeChangeStart', handleRouteChangeStart);
		Router.events.on('routeChangeComplete', handleRouteChangeComplete);

		return () => {
			Router.events.off('routeChangeStart', handleRouteChangeStart);
			Router.events.off('routeChangeComplete', handleRouteChangeComplete);
		};
	}, []);

	// return loading ? <LinearProgress sx={{zIndex: theme => theme.zIndex.tooltip}} /> : null;
	return (
		<Indicator
			open={loading}
			onClick={() => setLoading(false)}
		/>
	);
};

export default memo(PageLoadingWidget);
