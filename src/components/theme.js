/** @format */

import { alpha, createTheme } from '@mui/material/styles';
const blurBgStyles = ({ theme }) => ({
	backgroundColor: `${alpha(theme.palette.background.dark, 0.25)} !important`,
	WebkitBackdropFilter: [`blur(${theme.spacing()})`, `blur(${theme.spacing()})`],
	backdropFilter: `blur(${theme.spacing()})`,
	backgroundImage: `linear-gradient(${alpha(theme.palette.background.main, 0.85)}, ${alpha(
		theme.palette.background.dark,
		0.95
	)})`
});
const bgStyles = ({ theme }) => ({
	backgroundColor: `${theme.palette.background.dark} !important`,
	backgroundImage: `linear-gradient(${alpha(theme.palette.background.main, 0.15)}, ${alpha(
		theme.palette.background.main,
		0.25
	)})`
});
const bgGradientStyles = ({ theme }) => ({
	backgroundColor: `${alpha(theme.palette.background.light, 0.95)} !important`,
	backgroundImage: `linear-gradient(${alpha(theme.palette.background.light, 0.95)}, ${alpha(
		theme.palette.background.light,
		0.95
	)})`
});
const bgDarkStyles = ({ theme }) => ({
	backgroundColor: `${theme.palette.background.dark} !important`,
	backgroundImage: `linear-gradient(${alpha(theme.palette.background.dark, 0.15)}, ${alpha(
		theme.palette.background.dark,
		0.25
	)})`
});
const bgLightStyles = ({ theme }) => ({
	backgroundColor: `${theme.palette.background.light} !important`,
	backgroundImage: `linear-gradient(${alpha(theme.palette.background.light, 0.15)}, ${alpha(
		theme.palette.background.light,
		0.25
	)})`
});
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
			main: '#000342',
			dark: '#000b1f',
			light: '#01066e'
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
		MuiDrawer: {
			styleOverrides: {
				paper: blurBgStyles
			}
		},
		MuiChartsTooltip: {
			styleOverrides: {
				row: bgStyles
			}
		},
		MuiAutocomplete: {
			styleOverrides: {
				popper: bgStyles
			}
		},
		MuiMenu: {
			styleOverrides: {
				paper: bgStyles
			}
		},
		MuiPopper: {
			styleOverrides: {
				root: bgStyles
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: bgGradientStyles
			}
		},
		// MuiBackdrop: {
		// 	styleOverrides: {
		// 		root: ({ theme }) => ({
		// 			backgroundColor: `${alpha(theme.palette.background.dark, 0.1)} !important`,
		// 			WebkitBackdropFilter: [`blur(2px)`, `blur(2px})`],
		// 			backdropFilter: `blur(2px)`,
		// 			backgroundImage: `linear-gradient(${alpha(theme.palette.background.main, 0.015)}, ${alpha(
		// 				theme.palette.background.dark,
		// 				0.015
		// 			)})`
		// 		})
		// 	}
		// },
		// MuiCardHeader: {
		// 	styleOverrides: {
		// 		root: ({ theme }) => ({
		// 			backgroundColor: `${alpha(theme.palette.background.dark, 0.5)} !important`
		// 		})
		// 	}
		// }
	}
});
export default theme;