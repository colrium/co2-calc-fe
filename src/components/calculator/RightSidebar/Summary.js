import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useCalculatorForm } from '../CalculatorProvider';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5
		// backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
	}
}));

export default function Summary() {
	const { formik } = useCalculatorForm();
	const {
		results
	} = { ...formik.values };

	const scope1 = typeof results?.byScope?.scope1 === 'number' && !isNaN(results?.byScope?.scope1) ? results.byScope.scope1 : 0;
	const scope2 = typeof results?.byScope?.scope2 === 'number' && !isNaN(results?.byScope?.scope2) ? results.byScope.scope2 : 0;
	const scope3us =
		typeof results?.byScope?.scope3us === 'number' && !isNaN(results?.byScope?.scope3us) ? results.byScope.scope3us : 0;
	const scope3ds =
		typeof results?.byScope?.scope3ds === 'number' && !isNaN(results?.byScope?.scope3ds) ? results.byScope.scope3ds : 0;
	const total = scope1 + scope2 + scope3us + scope3ds;
	const scope1Percentage = total > 0 ? ((scope1 / total) * 100).toFixed(2) : 0;
	const scope2Percentage = total > 0 ? ((scope2 / total) * 100).toFixed(2) : 0;
	const scope3usPercentage = total > 0 ? ((scope3us / total) * 100).toFixed(2) : 0;
	const scope3dsPercentage = total > 0 ? ((scope3ds / total) * 100).toFixed(2) : 0;


	console.log('total', total);
	return (
		<Box className="flex flex-col">
			<Box className="mb-4">
				<Typography color="textSecondary">CARBON FOOTPRINT</Typography>
				<Typography color="secondary">
					<span className="text-7xl">{total}</span>tCO<sub>2</sub>e
				</Typography>
			</Box>
			<Divider />
			<Box className="flex flex-row items-center py-4 gap-4">
				<Typography className="flex-1" variant="h6" color="textSecondary">
					Emissions by scope
				</Typography>
				<Typography color="textSecondary" variant="body2">
					tCO<sub>2</sub>e
				</Typography>
			</Box>
			<Box className="py-2">
				<Box className="flex flex-row items-center gap-4">
					<Typography className="flex-1" variant="h6" color="textSecondary">
						Scope 1
					</Typography>
					<Typography color="textSecondary" variant="h6">
						{scope1 > 0 ? scope1 : '--.--'}
					</Typography>
				</Box>
				<Box className="flex flex-row items-center gap-4">
					<BorderLinearProgress variant="determinate" value={scope1Percentage} className="flex-1" color="info" />
					<Typography color="textSecondary" variant="body2">
						{scope1Percentage}%
					</Typography>
				</Box>
			</Box>

			<Box className="py-2">
				<Box className="flex flex-row items-center gap-4">
					<Typography className="flex-1" variant="h6" color="textSecondary">
						Scope 2
					</Typography>
					<Typography color="textSecondary" variant="h6">
						{scope2 > 0 ? scope2 : '--.--'}
					</Typography>
				</Box>
				<Box className="flex flex-row items-center gap-4">
					<BorderLinearProgress
						variant="determinate"
						value={scope2Percentage}
						className="flex-1"
						color="warning"
					/>
					<Typography color="textSecondary" variant="body2">
						{scope2Percentage}%
					</Typography>
				</Box>
			</Box>

			<Box className="py-2">
				<Box className="flex flex-row items-center gap-4">
					<Typography className="flex-1" variant="h6" color="textSecondary">
						Scope 3 Upstream
					</Typography>
					<Typography color="textSecondary" variant="h6">
						{scope3us > 0 ? scope3us : '--.--'}
					</Typography>
				</Box>
				<Box className="flex flex-row items-center gap-4">
					<BorderLinearProgress
						variant="determinate"
						value={scope3usPercentage}
						className="flex-1"
						color="success"
					/>
					<Typography color="textSecondary" variant="body2">
						{scope3usPercentage}%
					</Typography>
				</Box>
			</Box>

			<Box className="py-2 mb-4">
				<Box className="flex flex-row items-center gap-4">
					<Typography className="flex-1" variant="h6" color="textSecondary">
						Scope 3 Downstream
					</Typography>
					<Typography color="textSecondary" variant="h6">
						{scope3ds > 0 ? scope3ds : '--.--'}
					</Typography>
				</Box>
				<Box className="flex flex-row items-center gap-4">
					<BorderLinearProgress
						variant="determinate"
						value={scope3dsPercentage}
						className="flex-1"
						color="tertiary"
					/>
					<Typography color="textSecondary" variant="body2">
						{scope3dsPercentage}%
					</Typography>
				</Box>
			</Box>
			<Divider />
			<Typography color="textSecondary" variant="body2">
				Values above will update as you add activity data.
			</Typography>
		</Box>
	);
}
