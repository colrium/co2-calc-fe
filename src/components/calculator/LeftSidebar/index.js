import { Step, StepLabel, Stepper } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import { useCalculatorForm } from '../CalculatorProvider';
const drawerWidth = 320;
export default function LeftSidebar({ steps, step, onChangeStep, open, onClose, variant }) {
	const { formik } = useCalculatorForm();
	

	return (
		<Drawer
			variant={variant}
			sx={{
				width: drawerWidth,
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
				{steps.map(({ label, Component, name }, index) => (
					<Step key={name} onClick={() => onChangeStep(index)}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Drawer>
	);
}
