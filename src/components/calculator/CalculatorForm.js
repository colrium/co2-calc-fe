/** @format */

import { useDidUpdate, useFetcher, useSetState, useUniqueEffect } from '@/hooks';
import { selectCalculator, setCalculatorContext, updateCompanyAssessment, updateProductAssessment } from '@/store/calculatorSlice';
import { deepEqual } from '@/util';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'throttle-debounce';
import CalculatorProvider from './CalculatorProvider';
import CompanyOverview from './Company/Overview';
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
const companyStages = [
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
	// {
	// 	name: 'results',
	// 	label: 'Results',
	// 	Component: CompanyResults
	// }
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
	company: companyStages,
	product: productSteps
};
const contextValidationSchemas = {
	company: companyValidationSchema,
	product: productValidationSchema
};
export default function CalculatorForm({id=null, rows=[]}) {		
	const calculator = useSelector(selectCalculator);
	const context = {name: 'company', active: -1, ...calculator.context};
	const { name, step = 0 } = context;
	const fetcher = useFetcher();
	const dispatch = useDispatch();
	const headerRef = useRef();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	const drawerVariant = isMobile ? 'temporary' : 'persistent';
	
	// let active = idIndex > -1? idIndex: context.active
	let active = context.active;
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
		rightDrawerOpen: !isMobile,
		data: {}
	});
	
	const [completedSteps, setCompletedStepSteps] = useState([0]);

	const data = rows?.find(row => id=== row.id);
	const steps = useMemo(() => contextSteps[name], [name]);
	const stepName = steps[step]?.name;
	const validationSchema = useMemo(() => contextValidationSchemas[name], [name]);
	const formik = useFormik({
		initialValues: {
			year: dayjs().year(),
			activities: { scope1: {}, scope2: {}, scope3us: {}, scope3ds: {} },
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

			...data
		},
		validationSchema: validationSchema
	});
	const { lastModified, ...values } = formik.values || {};
	const {activities, year} = values
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
			axios.get(`/api/activity-types?scope=${scope}`).then(({ data: {data} }) =>
					setState((prevState) => ({
						activityTypes: {
							...prevState.activityTypes,
							[scope]: Array.isArray(data) ? data : []
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
			axios
				.get(`/api/factors?sections={"$in": ["${activityType}"]}`)
				.then(({ data: { data } }) => {
					data = Array.isArray(data) ? data : [];
					data = data.map((factor) => ({ ...factor, label: factor.name, value: factor.id }));
					setState((prevState) => ({
						factors: { ...prevState.factors, [activityType]: data }
					}));
				})
				.catch((err) => console.error(`/api/factors?sections={"$in": ["${activityType}"]}`, err))
				.finally(() => setState((prevState) => ({ factors: { ...prevState.factors, loading: false } })));
		}
	};

	
	const persistValues = useCallback((values) => {
			const action = name === 'product' ? updateProductAssessment : updateCompanyAssessment;
			dispatch(action({ index: active, value: { ...values, lastModified: dayjs().toISOString() } }));
		},
		[active, name]
	);

	const calculateEmissions = debounce(500, (activities) => {
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
							const emissionFactor = activity.emissionFactor > 0? activity.emissionFactor : activity.emissionsType === 'biogenic'? 0.1 : 0.8;
							const emissionsType = activity.emissionsType;
							const emissions = (emissionFactor * amount);
							results.byScope[scope] += emissions;
							if (emissionsType) {
								results.byEmissionsType[emissionsType] += emissions;
							}
						}
					}
				}
			}
					
			
		}

		formik.setFieldValue('results', results);
	});

	const toggleDrawer = (side) => () => {
		const name = side === 'right' ? 'rightDrawerOpen' : 'leftDrawerOpen';
		setState(prevState => ({[name]: !prevState[name]}))
	}

	useUniqueEffect(() => {
		if (data) {
			formik.setValues({ activities: {}, ...data });
		}
	}, [name, active, year]);

	useUniqueEffect(() => {
		if (id) {
			axios.get(`/api/results/${id}`).then(({data}) => {
				setState({data})
				formik.setValues({ activities: {}, ...data });
			})			
		}
	}, [id]);

	const debouncedPersistValues = debounce(1000, ({ values, active, name, id }) => {
		axios.put(`/api/results/${id}`, { ...values, type: name, updatedAt: dayjs().toISOString() });
		// const action = name === 'product' ? updateProductAssessment : updateCompanyAssessment;
		// dispatch(action({ index: active, value: { ...values, lastModified: dayjs().toISOString() } }));
	});
	
	useDidUpdate(() => {
		if (id && !deepEqual(state.data, values)) {
			debouncedPersistValues({ values, active, name, id });
		}		
	}, [values]);

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
				<Box
					className="flex"
					sx={{
						// pt: (theme) => theme.spacing(10),
						display: 'grid',
						gridTemplateColumns: 'auto 1fr auto',
						gridTemplateRows: '1fr',
						gridColumnGap: '0px',
						gridRowGap: '0px'
					}}
				>
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
						open={state.rightDrawerOpen && stepName !== 'results'}
						onClose={() => setState({ rightDrawerOpen: false })}
						variant={drawerVariant}
					/>
				</Box>
			</CalculatorProvider>
		</Grid>
	);
}
