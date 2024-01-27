import { Step, StepLabel, Stepper } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import { useCalculatorForm } from '../CalculatorProvider';
const drawerWidth = 320;

const StepComponent = () => {}
export default function LeftSidebar({ steps, step, onChangeStep, open, onClose, variant }) {
	const { formik, stepName } = useCalculatorForm();
	

	return (
		<Drawer
			variant={variant}
			sx={{
				width: open? drawerWidth : 0,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: 'border-box',
					zIndex: (theme) => theme.zIndex.appBar - 1,
					padding: (theme) => theme.spacing(2)
				},
				zIndex: (theme) => theme.zIndex.appBar - 1
			}}
			open={open}
			onClose={onClose}
		>
			<Toolbar />

			<Stepper className="w-full" activeStep={step} orientation="vertical">
				{steps.map(({ label, Component, name }, index) => {
					const completed = Object.keys(formik.values?.activities?.[name] || {}).length > 0;
					return (
						<Step key={name} onClick={() => onChangeStep(index)}>
							<StepLabel completed={completed}>{label}</StepLabel>
						</Step>
					);})}
			</Stepper>
		</Drawer>
	);
}
