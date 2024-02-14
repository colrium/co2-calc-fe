/** @format */

'use client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, alpha } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import theme from './theme';

const blurBgStyles = {
	backgroundColor: (theme) => `${alpha(theme.palette.background.dark, 0.25)} !important`,
	WebkitBackdropFilter: (theme) => [`blur(${theme.spacing()})`, `blur(${theme.spacing()})`],
	backdropFilter: (theme) => `blur(${theme.spacing()})`
};
// hoist to static to avoid recalculation
const globalStyles = (
	<GlobalStyles
		styles={{
			'& .MuiPopover-paper': blurBgStyles,
			'& .MuiAutocomplete-popper': blurBgStyles,
			'& .MuiDrawer-paper': blurBgStyles,
			// '& .MuiPopper-root': {
			// 	'& .MuiTooltip-tooltip': blurBgStyles
			// }
		}}
	/>
);
// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props) {
	const { options, children } = props;
	const [{ cache, flush }] = useState(() => {
		const cache = createCache(options);
		cache.compat = true;
		const prevInsert = cache.insert;
		let inserted = [];
		cache.insert = (...args) => {
			const serialized = args[1];
			if (cache.inserted[serialized.name] === undefined) {
				inserted.push(serialized.name);
			}
			return prevInsert(...args);
		};
		const flush = () => {
			const prevInserted = inserted;
			inserted = [];
			return prevInserted;
		};
		return { cache, flush };
	});
	useServerInsertedHTML(() => {
		const names = flush();
		if (names.length === 0) {
			return null;
		}
		let styles = '';
		for (const name of names) {
			styles += cache.inserted[name];
		}
		return (
			<style
				key={cache.key}
				data-emotion={`${cache.key} ${names.join(' ')}`}
				dangerouslySetInnerHTML={{
					__html: styles
				}}
			/>
		);
	});

	console.log('theme.spacing()', theme.spacing());
	return (
		<CacheProvider value={cache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
