/** @format */

'use client';
import { useThemeMode } from '@/hooks';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useServerInsertedHTML } from 'next/navigation';
import { useMemo, useState } from 'react';
import lightTheme from './theme';
import darkTheme from './theme-dark';

// hoist to static to avoid recalculation

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props) {
	const { options, children } = props;
	const [themeMode] = useThemeMode()
	// const { themeMode } = useSelector(selectAuth);
	// const sytemInDarkMode = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	// const isDarkMode = themeMode === 'system' ? sytemInDarkMode : themeMode === 'dark';
	const theme = themeMode === 'dark' ? darkTheme : lightTheme;

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
					.surface,
					.Surface {
						background-color: ${theme.palette.background.surface} !important;
					}
					.fill-primary {
						fill: ${theme.palette.primary.main};
					}
					.fill-background {
						fill: ${theme.palette.background.main};
					}
					.fill-background-surface {
						fill: ${theme.palette.background.surface};
					}
					.fill-background-dark {
						fill: ${theme.palette.background.dark};
					}
					.fill-primary {
						fill: ${theme.palette.primary.main};
					}
					.fill-primary-dark {
						fill: ${theme.palette.primary.dark};
					}
					.fill-secondary {
						fill: ${theme.palette.secondary.main};
					}
					.fill-secondary-dark {
						fill: ${theme.palette.secondary.dark};
					}
					.fill-tertiary {
						fill: ${theme.palette.tertiary.main};
					}
					.fill-tertiary-dark {
						fill: ${theme.palette.tertiary.dark};
					}
				`}</style>
				{globalStyles}
				<LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
