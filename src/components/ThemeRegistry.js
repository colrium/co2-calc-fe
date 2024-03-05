/** @format */

'use client';
import { selectAuth } from '@/store/authSlice';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useServerInsertedHTML } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import lightTheme from './theme';
import darkTheme from './theme-dark';

// hoist to static to avoid recalculation

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props) {
	const { options, children } = props;
	const { themeMode } = useSelector(selectAuth);
	const theme = themeMode === 'light' ? lightTheme : darkTheme;
	const globalStyles = useMemo(
		() => (
			<CssBaseline
				styles={{
					body: {
						backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.main}, ${theme.palette.background.dark})`
					},
					'& .MuiListItemIcon-root': {
						color: theme.palette.text.secondary,
						'& svg': {
							fill: `${theme.palette.text.secondary} !important`
						}
					},
					
					'& .MuiDataGrid-paper': {
						backgroundColor: (theme) => theme.palette.background.main
					}
				}}
			/>
		),
		[themeMode, theme]
	);
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
	
	return (
		<CacheProvider value={cache}>
			<ThemeProvider theme={theme}>
				<style global jsx>{`
					body {
						background-image: linear-gradient(
							to bottom,
							${theme.palette.background.main},
							${theme.palette.background.dark}
						);
					}
					.surface, .Surface {
						background-color: ${theme.palette.background.surface} !important
				
					}
				`}</style>
				{globalStyles}
				<LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
