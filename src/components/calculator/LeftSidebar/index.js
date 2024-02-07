import { Step, StepLabel, Stepper } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCalculatorForm } from '../CalculatorProvider';


const StepComponent = () => {}
export default function LeftSidebar({ steps, step, onChangeStep, open, onClose, variant }) {
	const { formik, stepName } = useCalculatorForm();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('lg'));
	const drawerWidth = theme.mixins.drawerWidth;
	return (
		<Drawer
			variant={variant}
			sx={{
				width: open ? drawerWidth : 0,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: 'border-box',
					zIndex: (theme) => theme.zIndex.appBar - 1,
					padding: (theme) => theme.spacing(2)
				},
				zIndex: (theme) => theme.zIndex.appBar - 1,
				[`&.MuiDrawer-modal`]: {
					zIndex: (theme) => theme.zIndex.drawer
				}
			}}
			open={open}
			onClose={onClose}
		>
			{matches && <Toolbar sx={{ height: theme.mixins.toolbar.height }} />}

			<Stepper className="w-full" activeStep={step} orientation="vertical">
				{steps.map(({ label, Component, name }, index) => {
					const completed = Object.keys(formik.values?.activities?.[name] || {}).length > 0;
					return (
						<Step key={name} onClick={() => onChangeStep(index)}>
							<StepLabel completed={completed}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</Drawer>
	);
}
