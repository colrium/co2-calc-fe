import theme from '@/components/theme';
import {
	mdiAbacus,
	mdiAccountFileOutline,
	mdiAccountMultipleOutline,
	mdiCalculatorVariantOutline,
	mdiFactory,
	mdiFinance,
	mdiShapeOutline,
	mdiViewDashboard
} from '@mdi/js';
export const publicRoutes = [
	{ pathname: '/', label: 'Home' },
	{ pathname: '/how-it-works', label: 'How it works' },
	{ pathname: '/help', label: 'Help' }
];

export const authRoutes = [
	{ pathname: '/auth/register', label: 'Register', menuLabel: 'Get Started' },
	{ pathname: '/auth/login', label: 'Login' },
	{ pathname: '/auth/forgot-password', label: 'Forgot Password', title: 'Recover Password', includeInMenu: false },
	{ pathname: '/auth/reset-password', label: 'Reset Password', includeInMenu: false }
];

export const privateRoutes = [
	{ pathname: '/dashboard/overview', label: 'Overview', icon: mdiViewDashboard },
	{ pathname: '/dashboard/calculate', label: 'Calculate', icon: mdiCalculatorVariantOutline },
	{ pathname: '/dashboard/results', label: 'Results', icon: mdiAccountFileOutline }
];
export const adminRoutes = [
	// ...privateRoutes,
	{ pathname: '/dashboard/scopes', label: 'Scopes', icon: mdiShapeOutline },
	{ pathname: '/dashboard/factors', label: 'Factors', icon: mdiAbacus },
	{ pathname: '/dashboard/activity-types', label: 'Activity Types', icon: mdiFactory },
	

	{ pathname: '/dashboard/reports', label: 'Reports', icon: mdiFinance },
	{ pathname: '/dashboard/users', label: 'Users', icon: mdiAccountMultipleOutline }
];
export const scopes = {
	scope1: { name: 'scope1', label: 'Scope 1', color: theme.palette.info.main, colorName: 'info' },
	scope2: { name: 'scope2', label: 'Scope 2', color: theme.palette.warning.main, colorName: 'warning' },
	scope3us: { name: 'scope3us', label: 'Scope 3 Upstream', color: theme.palette.success.main, colorName: 'success' },
	scope3ds: { name: 'scope3ds', label: 'Scope 3 Downstream', color: theme.palette.tertiary.main, colorName: 'tertiary' }
};
export const emissionTypes = {
	biogenic: { name: 'biogenic', label: 'Biogenic', color: theme.palette.cyan.main, colorName: 'cyan' },
	fossil: { name: 'fossil', label: 'Fossil', color: theme.palette.pink.main, colorName: 'pink' }
};
export const title = 'Carbon Footprint Calculator';
export const subtitle = 'Manufacturing Carbon Footprint';