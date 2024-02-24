import theme from '@/components/theme';
import {
	mdiAbacus,
	mdiAccountMultipleOutline,
	mdiBullseyeArrow,
	mdiCalculatorVariantOutline,
	mdiFactory,
	mdiFinance,
	mdiMoleculeCo2,
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
	{ pathname: '/dashboard/calculations', label: 'Calculations', icon: mdiCalculatorVariantOutline },
	// { pathname: '/dashboard/calculate', label: 'Calculate', icon: mdiCalculatorVariantOutline },
	{ pathname: '/dashboard/targets', label: 'Targets', icon: mdiBullseyeArrow },
	{ pathname: '/dashboard/domains', label: 'Domains', icon: mdiFactory },
	{ pathname: '/dashboard/reports', label: 'Reports', icon: mdiFinance }
];
export const adminRoutes = [
	// { pathname: '/dashboard/scopes', label: 'Scopes', icon: mdiShapeOutline },
	{ pathname: '/dashboard/activities', label: 'Activities', icon: mdiMoleculeCo2 },
	{ pathname: '/dashboard/activity-types', label: 'Activity types', icon: mdiAbacus },
	{ pathname: '/dashboard/users', label: 'Users', icon: mdiAccountMultipleOutline },
	{ pathname: '/dashboard/industries', label: 'Industries', icon: mdiFactory }
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
