import LinearProgress from '@mui/material/LinearProgress';
import Router from 'next/router';
import { useEffect, useState } from 'react';

const PageLoadingWidget = () => {
	const [loading, setLoading] = useState(false);

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

	return loading ? <LinearProgress sx={{zIndex: theme => theme.zIndex.tooltip}} /> : null;
};

export default PageLoadingWidget;
