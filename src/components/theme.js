/** @format */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			// main: '#051937'
			// main: '#A8EB12'
			main: '#A8EB12'
		},
		secondary: {
			// main: '#89bfd7'
			main: '#00B0BC'
		},
		tertiary: {
			// main: '#39d10f'
			main: '#FF0000'
		},
		inverse: {
			main: '#000000'
		},
		brown: {
			main: '#632d00'
		},
		cyan: {
			main: '#00FFFF'
		},
		pink: {
			main: '#C850C0'
		},
		background: {
			paper: 'transparent',
			default: '#00153B',
			elevatedPaper: '#000342'
		},
		text: {
			primary: '#F4F4F4',
			secondary: '#EAEAEA',
			disabled: '#C2C2C2'
		}
	},
	mixins: {
		drawerWidth: 280
	},
	typography: {
		subtitle1: {
			fontSize: 20
		},
		subtitle2: {
			fontSize: 16,
			fontWeight: 400
		},
		body1: {
			fontSize: 14
		},
		body2: {
			fontSize: 13
		},
		fontFamily: [
			'Google Sans',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	},
	components: {
		MuiPopover: {
			styleOverrides: {
				paper: ({ theme }) => ({
					backgroundColor: theme.palette.background.elevatedPaper
				}),
				label: {
					padding: 'initial'
				}
			}
		}
	}
});
export default theme;