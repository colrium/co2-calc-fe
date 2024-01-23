/** @format */

import { useUniqueEffect } from '@/hooks';
import { selectCalculator, setCalculatorContext, updateCompanyAssessment, updateProductAssessment } from '@/store/calculatorSlice';
import { Box, Grid, Step, StepLabel, Stepper } from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import ProductOverview from './Product/Overview';
import RawMaterials from './Product/RawMaterials';
import productValidationSchema from './Product/validationSchema';
import ResultsSidebar from './ResultSidebar';
const companySteps = [
	{
		name: 'overview',
		label: 'Overview',
		Component: CompanyOverview
	},
	{
		name: 'scope-1',
		label: 'Scope 1',
		Component: CompanyScope1
	},
	{
		name: 'scope-2',
		label: 'Scope 2',
		Component: CompanyScope2
	},
	{
		name: 'scope-3-upstream',
		label: 'Scope 3 Upstream',
		Component: CompanyScope3Upstream
	},
	{
		name: 'scope-3-downstream',
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
	const [completedSteps, setCompletedStepSteps] = useState([0]);
	const data = rows[active];
	const steps = useMemo(() => contextSteps[name], [name]);
	const validationSchema = useMemo(() => contextValidationSchemas[name], [name]);
	const formik = useFormik({
		initialValues: { activities: {}, ...rows[active] },
		validationSchema: validationSchema
	});
	const changeContext = (name, active) => {
		dispatch(setCalculatorContext({name, active}));
		formik.resetForm();
	};

	const setActiveStep = (step) => {
		dispatch(setCalculatorContext({ step }));
	};

	const Component = steps[step]?.Component;

	useEffect(() => {
		if (data) {
			formik.setValues({ activities: {}, ...rows[active] });
		}
	}, [name, active]);
	const persistValues = useCallback(
		debounce(50, () => {
			const action = name === 'product' ? updateProductAssessment : updateCompanyAssessment;
			dispatch(action({ index: active, value: {...formik.values, lastModified: dayjs().toISOString()} }));
		}),
		[active, name, formik.values]
	);

	const estimateEmissions = useCallback(
		debounce(1000, () => {
			
		}),
		[active, name, formik.values]
	);
	useUniqueEffect(() => {
		persistValues();
	}, [formik.values]);

	return (
		<Grid container>
			<CalculatorProvider
				value={{
					steps,
					step,
					setActiveStep,
					formik,
					completedSteps,
					setCompletedStepSteps,
					units,
					setContext: changeContext,
					name,
					rows
				}}
			>
				<Box>
					<Grid container>
						<Grid item xs={12}>
							<FormHeader ref={headerRef} />
						</Grid>
						<Grid item md={3}>
							<Stepper className="w-full" activeStep={step} orientation="vertical">
								{steps.map(({ label, Component, name }, index) => (
									<Step key={name} onClick={() => setActiveStep(index)}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
						</Grid>
						<Grid item md={6}>
							<Component />
						</Grid>
						<Grid item md={3}>
							<ResultsSidebar />
						</Grid>
					</Grid>
				</Box>
			</CalculatorProvider>
		</Grid>
	);
}
