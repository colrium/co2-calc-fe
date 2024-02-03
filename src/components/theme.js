/** @format */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#000000'
		},
		secondary: {
			// main: '#89bfd7'
			main: '#4290b3'
		},
		tertiary: {
			main: '#FF0000'
		},
		inverse: {
			main: '#FFFFFF'
		},
		brown: {
			main: '#632d00'
		},
		cyan: {
			main: '#019179'
		},
		background: {
			paper: '#FFFFFF',
			default: '#f2f2f2'
		},
		text: {
			primary: '#424242',
			secondary: '#757575',
			disabled: '#dedede'
		}
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
	}
});
export default theme;