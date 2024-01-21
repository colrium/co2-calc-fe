/** @format */

import { Grid, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import CalculatorProvider from './CalculatorProvider';
import Overview from './Overview';
import Results from './Results';
import Scope1 from './Scope1';
import Scope2 from './Scope2';
import Scope3Downstream from './Scope3Downstream';
import Scope3Upstream from './Scope3Upstream';
import validationSchema from './validationScema';
const steps = [
	{
		name: 'overview',
		label: 'Overview',
		Component: Overview
	},
	{
		name: 'scope-1',
		label: 'Scope 1',
		Component: Scope1
	},
	{
		name: 'scope-2',
		label: 'Scope 2',
		Component: Scope2
	},
	{
		name: 'scope-3-upstream',
		label: 'Scope 3 Upstream',
		Component: Scope3Upstream
	},
	{
		name: 'scope-3-downstream',
		label: 'Scope 3 Downstream',
		Component: Scope3Downstream
	},
	{
		name: 'results',
		label: 'Results',
		Component: Results
	}
];
const units = ['pkm', 'kg', 'kwh', 'mwh', 'l', 'm3', 't', 'tkm', 'unit', 'kpl'];
export default function CalculatorForm() {
	const [activeStep, setActiveStep] = useState(0);
	const [completedSteps, setCompletedStepSteps] = useState([0]);
	const formik = useFormik({
		initialValues: { activities: {} },
		validationSchema: validationSchema
	});
	const Component = steps[activeStep]?.Component;

    return (
		<CalculatorProvider
			value={{ steps, activeStep, setActiveStep, formik, completedSteps, setCompletedStepSteps, units }}
		>
			<Grid container>
				<Grid item md={3}>
					<Stepper className="w-full" activeStep={activeStep} orientation="vertical">
						{steps.map(({ label, Component, name }, index) => (
							<Step key={name} onClick={() => setActiveStep(index)}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
				</Grid>
				<Grid item md={9}>
					<Component />
				</Grid>
			</Grid>
		</CalculatorProvider>
	);
}
