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
	backgroundColor: `${alpha(theme.palette.background.dark, 0.95)} !important`,
	backgroundImage: `linear-gradient(${alpha(theme.palette.background.dark, 0.95)}, ${alpha(
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
export const getTheme = (mode='dark') => {
	const modePalette =
		mode === 'light'
			? {
					background: {
						paper: 'transparent',
						default: '#EDF2FA',
						main: '#E0ECFF',
						dark: '#CADEFC',
						light: '#EBF2FF',
						surface: '#f2f7ff'
					},
					text: {
						primary: '#0b0b0b',
						secondary: '#666666',
						disabled: '#3d3d3d'
					},
					inverse: {
						main: '#FFFFFF'
					}
			  }
			: {
					mode: mode,
					background: {
						paper: 'transparent',
						default: '#00153B',
						main: '#000342',
						dark: '#000b1f',
						light: '#01066e',
						surface: '#00022b'
					},
					text: {
						primary: '#F4F4F4',
						secondary: '#999999',
						disabled: '#C2C2C2'
					},
					inverse: {
						main: '#000000'
					}
			  };
	return createTheme({
		palette: {
			
			primary: {
				main: '#00B0BC'
			},
			secondary: {
				main: '#A8EB12'
			},
			tertiary: {
				main: '#FF0000'
			},
			inverse: {
				main: '#000000'
			},
			brown: {
				main: '#632d00'
			},
			orange: {
				main: '#d99802'
			},
			blue: {
				main: '#0295d9'
			},
			teal: {
				main: '#02d987'
			},
			cyan: {
				main: '#00FFFF'
			},
			pink: {
				main: '#C850C0'
			},
			...modePalette
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
			MuiDataGrid: {
				panelContent: bgStyles
			},
			MuiPopper: {
				styleOverrides: {
					'& .MuiPaper-root': bgStyles
				}
			},
			MuiDialog: {
				styleOverrides: {
					paper: blurBgStyles
				}
			},
			MuiTooltip: {
				styleOverrides: {
					tooltip: ({ theme }) => ({
						color: theme.palette.text.primary,
						backgroundColor: `${theme.palette.background.dark} !important`,
						backgroundImage: `linear-gradient(${alpha(theme.palette.background.dark, 0.15)}, ${alpha(
							theme.palette.background.dark,
							0.25
						)})`
					})
				}
			},
			MuiPickersPopper: {
				styleOverrides: {
					paper: blurBgStyles
				}
			},
			MuiDataGrid: {
				styleOverrides: {
					menu: bgDarkStyles
				}
			},
			MuiListItemIcon: {
				root: ({ theme }) => ({
					color: `${theme.palette.text.secondary} !important`,
					
				})
			}
		}
	});
}

const theme = getTheme('light')
export default theme;