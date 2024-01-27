/** @format */


import { useSetState } from '@/hooks';
import { Box, Grid, Typography } from '@mui/material';
// import { PieChart } from '@mui/x-charts/PieChart';
import { useCalculatorForm } from '../../CalculatorProvider';
import { BorderLinearProgress } from '../../RightSidebar/Summary';
export default function Results() {
	const { formik } = useCalculatorForm();
	const { results } = { ...formik.values };

	const scope1 =
		typeof results?.byScope?.scope1 === 'number' && !isNaN(results?.byScope?.scope1) ? results.byScope.scope1 : 0;
	const scope2 =
		typeof results?.byScope?.scope2 === 'number' && !isNaN(results?.byScope?.scope2) ? results.byScope.scope2 : 0;
	const scope3us =
		typeof results?.byScope?.scope3us === 'number' && !isNaN(results?.byScope?.scope3us) ? results.byScope.scope3us : 0;
	const scope3ds =
		typeof results?.byScope?.scope3ds === 'number' && !isNaN(results?.byScope?.scope3ds) ? results.byScope.scope3ds : 0;
	const biogenic =
		typeof results?.byEmissionsType?.biogenic === 'number' && !isNaN(results?.byEmissionsType?.biogenic)
			? results.byEmissionsType.biogenic
			: 0;
	const fossil =
		typeof results?.byEmissionsType?.fossil === 'number' && !isNaN(results?.byEmissionsType?.fossil)
			? results.byEmissionsType.fossil
			: 0;
	const total = scope1 + scope2 + scope3us + scope3ds;
	const scope1Percentage = total > 0 ? ((scope1 / total) * 100).toFixed(2) : 0;
	const scope2Percentage = total > 0 ? ((scope2 / total) * 100).toFixed(2) : 0;
	const scope3usPercentage = total > 0 ? ((scope3us / total) * 100).toFixed(2) : 0;
	const scope3dsPercentage = total > 0 ? ((scope3ds / total) * 100).toFixed(2) : 0;
	const biogenicPercentage = total > 0 ? ((biogenic / total) * 100).toFixed(2) : 0;
	const fossilPercentage = total > 0 ? ((fossil / total) * 100).toFixed(2) : 0;

	const [state, setState] = useSetState({
		activeIndex: 0,

	});

	const onPieEnter = (_, index) => {
		setState({
			activeIndex: index
		});
	};

	const pieChartData = [
		{ label: 'Scope 1', value: scope1,  },
		{ label: 'Scope 2', value: scope2 },
		{ label: 'Scope 3 Upstream', value: scope3us },
		{ label: 'Scope 3 Downstream', value: scope3ds }
	];
	return (
		<Grid className="p-4" container>
			<Grid item xs={12} className="my-8">
				<Typography variant="h4">Results</Typography>
			</Grid>
			<Grid item xs={12} className="p-5">
				
					{/* <PieChart
					series={[
						{
							data: pieChartData,
							innerRadius: 50,
							outerRadius: 400,
							paddingAngle: 5,
							cornerRadius: 5,
							// startAngle: -90,
							// endAngle: 180,
							cx: 200,
							cy: 200,
						}
					]}
					/> */}
				{/* <ResponsiveContainer width="100%" height="100%">
					<PieChart width={400} height={400}>
						<Pie
							activeIndex={state.activeIndex}
							activeShape={renderActiveShape}
							data={pieChartData}
							cx="50%"
							cy="50%"
							innerRadius={160}
							outerRadius={200}
							fill="#8884d8"
							dataKey="value"
							onMouseEnter={onPieEnter}
						/>
					</PieChart>
				</ResponsiveContainer> */}
			</Grid>
			<Box>
				<Box className="flex flex-row items-center py-4 gap-4">
					<Typography className="flex-1" variant="subtitle2" color="textSecondary">
						Emissions by scope
					</Typography>
					<Typography color="textSecondary" variant="body2">
						tCO<sub>2</sub>e
					</Typography>
				</Box>
				<Box className="py-2">
					<Box className="flex flex-row items-center gap-4">
						<Typography className="flex-1" variant="subtitle2" color="textSecondary">
							Scope 1
						</Typography>
						<Typography color="textSecondary" variant="subtitle2">
							{scope1 > 0 ? scope1 : '--.--'}
						</Typography>
					</Box>
					<Box className="flex flex-row items-center gap-4">
						<BorderLinearProgress
							variant="determinate"
							value={scope1Percentage}
							className="flex-1"
							color="info"
						/>
						<Typography color="textSecondary" variant="body2">
							{scope1Percentage}%
						</Typography>
					</Box>
				</Box>

				<Box className="py-2">
					<Box className="flex flex-row items-center gap-4">
						<Typography className="flex-1" variant="subtitle2" color="textSecondary">
							Scope 2
						</Typography>
						<Typography color="textSecondary" variant="subtitle2">
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
						<Typography className="flex-1" variant="subtitle2" color="textSecondary">
							Scope 3 Upstream
						</Typography>
						<Typography color="textSecondary" variant="subtitle2">
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
						<Typography className="flex-1" variant="subtitle2" color="textSecondary">
							Scope 3 Downstream
						</Typography>
						<Typography color="textSecondary" variant="subtitle2">
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
			</Box>
		</Grid>
	);
}
