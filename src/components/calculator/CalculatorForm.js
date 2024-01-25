/** @format */

import { useSetState, useUniqueEffect } from '@/hooks';
import { selectCalculator, setCalculatorContext, updateCompanyAssessment, updateProductAssessment } from '@/store/calculatorSlice';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'throttle-debounce';
import CalculatorProvider from './CalculatorProvider';
import CompanyOverview from './Company/Overview';
import CompanyResults from './Company/Results';
import CompanyScope1 from './Company/Scope1';
import CompanyScope2 from './Company/Scope2';
import CompanyScope3Downstream from './Company/Scope3Downstream';
import CompanyScope3Upstream from './Company/Scope3Upstream';
import companyValidationSchema from './Company/validationSchema';
import FormHeader from './FormHeader';
import LeftSidebar from './LeftSidebar';
import ProductOverview from './Product/Overview';
import RawMaterials from './Product/RawMaterials';
import productValidationSchema from './Product/validationSchema';
import RightSidebar from './RightSidebar';
const companySteps = [
	{
		name: 'overview',
		label: 'Overview',
		Component: CompanyOverview
	},
	{
		name: 'scope1',
		label: 'Scope 1',
		Component: CompanyScope1
	},
	{
		name: 'scope2',
		label: 'Scope 2',
		Component: CompanyScope2
	},
	{
		name: 'scope3us',
		label: 'Scope 3 Upstream',
		Component: CompanyScope3Upstream
	},
	{
		name: 'scope3ds',
		label: 'Scope 3 Downstream',
		Component: CompanyScope3Downstream
	},
	{
		name: 'results',
		label: 'Results',
		Component: CompanyResults
	}
];
const productSteps = [
	{
		name: 'overview',
		label: 'Overview',
		Component: ProductOverview
	},
	{
		name: 'Raw Materials',
		label: 'Raw Materials',
		Component: RawMaterials
	}
];

const units = {
	pkm: 'Passenger Kilometers',
	kg: 'Kilograms',
	kwh: 'Kilowatt hours',
	mwh: 'Megawatt hours',
	l: 'Litres',
	m3: 'Cubic meters',
	t: 'Tonnes',
	tkm: 'Tonne Kilometers',
	unit: 'Unit',
	kpl: 'Kpl'
};
const contextSteps = {
	company: companySteps,
	product: productSteps
};
const contextValidationSchemas = {
	company: companyValidationSchema,
	product: productValidationSchema
};
export default function CalculatorForm() {		
	const calculator = useSelector(selectCalculator);
	const context = calculator.context;
	const { name, active, step = 0 } = { name: 'company', active: -1, ...context};
	const dispatch = useDispatch();
	const rows = calculator[name];
	const headerRef = useRef();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	const drawerVariant = isMobile ? 'temporary' : 'persistent';
	const [state, setState] = useSetState({
		activityTypes: {
			loading: false,
			scope1: [],
			scope2: [],
			scope3us: [],
			scope3ds: []
		},
		factors: {
			loading: false
		},
		leftDrawerOpen: !isMobile,
		rightDrawerOpen: !isMobile
	});
	
	const [completedSteps, setCompletedStepSteps] = useState([0]);
	const data = rows[active];
	const steps = useMemo(() => contextSteps[name], [name]);
	const stepName = steps[step]?.name;
	const validationSchema = useMemo(() => contextValidationSchemas[name], [name]);
	const formik = useFormik({
		initialValues: {
			activities: { scope1: {}, scope2: {}, scope3us: {}, scope3ds: {}, year: dayjs().year() },
			results: {
				byScope: {
					scope1: 0,
					scope2: 0,
					scope3us: 0,
					scope3ds: 0
				},
				byEmissionsType: {
					biogenic: 0,
					fossil: 0
				}
			},

			...rows[active]
		},
		validationSchema: validationSchema
	});

	const activities = formik.values?.activities
	const changeContext = (name, active) => {
		dispatch(setCalculatorContext({name, active}));
		formik.resetForm();
	};

	const setActiveStep = (step) => {
		dispatch(setCalculatorContext({ step }));
	};

	const fetchActivityTypes = (scope) => {
		if (scope) {
			setState((prevState) => ({ activityTypes: { ...prevState.activityTypes, loading: scope } }));
			fetch(`/api/activity-types/${scope}`)
				.then((res) => res.json())
				.then(({ activityTypes }) =>
					setState((prevState) => ({
						activityTypes: {
							...prevState.activityTypes,
							[scope]: Array.isArray(activityTypes) ? activityTypes : []
						}
					}))
				)
				.catch((err) => console.error(`/api/activity-types/${scope}`, err))
				.finally(() => setState((prevState) => ({ activityTypes: { ...prevState.activityTypes, loading: false } })));
		}
		
	};
	const fetchFactors = (activityType) => {
		if (activityType) {
			setState((prevState) => ({ factors: { ...prevState.factors, loading: activityType } }));
			fetch(`/api/factors/${activityType}`)
				.then((res) => res.json())
				.then(({ factors }) => {
					factors = Array.isArray(factors) ? factors : [];
					factors = factors.map((factor) => ({ ...factor, label: factor.name, value: factor.id }));
					setState((prevState) => ({
						factors: { ...prevState.factors, [activityType]: factors }
					}));
				})
				.catch((err) => console.error(`/api/factors/${scope}`, err))
				.finally(() => setState((prevState) => ({ factors: { ...prevState.factors, loading: false } })));
		}
	};

	
	const persistValues = useCallback(
		debounce(50, () => {
			const action = name === 'product' ? updateProductAssessment : updateCompanyAssessment;
			dispatch(action({ index: active, value: {...formik.values, lastModified: dayjs().toISOString()} }));
		}),
		[active, name, formik.values]
	);

	const calculateEmissions = debounce(1000, (activities) => {
		let results = {
			byScope: {
				scope1: 0,
				scope2: 0,
				scope3us: 0,
				scope3ds: 0
			},
			byEmissionsType: {
				biogenic: 0,
				fossil: 0
			}
		};

		for (const [scope, scopeActivities] of Object.entries(activities)) {
			if (scope) {
				for (const [name, entries] of Object.entries(scopeActivities)) {
					if (entries?.length > 0) {
						for (let i = 0; i < entries?.length; i++) {
							const activity = entries[i];
							const amount = activity.amount || 0;
							const emmissionFactor = activity.emmissionFactor || 1;
							const emissionsType = activity.emissionsType;
							const emmissions = emmissionFactor * amount;
							console.log('emmissions', emmissions, 'scope', scope, 'name', name);
							results.byScope[scope] += emmissions;
							if (emissionsType) {
								results.byEmissionsType[emissionsType] += emmissions;
							}
						}
					}
				}
			}
					
			
		}
		console.log('results', results);

		formik.setFieldValue('results', results);
	});

	const toggleDrawer = (side) => () => {
		const name = side === 'right' ? 'rightDrawerOpen' : 'leftDrawerOpen';
		setState(prevState => ({[name]: !prevState[name]}))
	}

	useUniqueEffect(() => {
		if (data) {
			formik.setValues({ activities: {}, ...rows[active] });
		}
	}, [name, active]);
	useUniqueEffect(() => {
		persistValues();
	}, [formik.values]);

	useUniqueEffect(() => {
		calculateEmissions(activities);
	}, [activities]);

	const Component = steps[step]?.Component;

	return (
		<Grid container>
			<CalculatorProvider
				value={{
					...state,
					steps,
					step,
					setActiveStep,
					formik,
					completedSteps,
					setCompletedStepSteps,
					units,
					setContext: changeContext,
					name,
					stepName,
					rows,
					fetchActivityTypes,
					fetchFactors,
					toggleDrawer
				}}
			>
				<Box className="flex" sx={{ pt: (theme) => theme.spacing(7) }}>
					<LeftSidebar
						open={state.leftDrawerOpen}
						onClose={() => setState({ leftDrawerOpen: false })}
						variant={drawerVariant}
						onChangeStep={(index) => setActiveStep(index)}
						steps={steps}
						step={step}
					/>
					<Box>
						<FormHeader ref={headerRef} />
						<Component />
					</Box>
					<RightSidebar
						open={state.rightDrawerOpen}
						onClose={() => setState({ rightDrawerOpen: false })}
						variant={drawerVariant}
					/>
				</Box>
			</CalculatorProvider>
		</Grid>
	);
}
