/** @format */


import { emissionTypes, scopes } from '@/config';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ChartsTooltip, ChartsXAxis, ChartsYAxis, PieChart, ResponsiveChartContainer } from '@mui/x-charts';
import { BarPlot } from '@mui/x-charts/BarChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { useMemo } from 'react';
import { useCalculatorForm } from '../../CalculatorProvider';
import { BorderLinearProgress } from '../../RightSidebar/Summary';
const StyledText = styled('text')(({ theme }) => ({
	fill: theme.palette.text.primary,
	textAnchor: 'middle',
	dominantBaseline: 'central',
	fontSize: 20
}));

function PieCenterLabel({ children }) {
	const { width, height, left, top } = useDrawingArea();
	return (
		<StyledText x={left + width / 2} y={top + height / 2}>
			{children}
		</StyledText>
	);
}
export default function Results() {
	const theme = useTheme()
	const { formik, activityTypes } = useCalculatorForm();
	const { results, activities, total } = { ...formik.values };

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
	
	const scope1Percentage = total > 0 ? ((scope1 / total) * 100).toFixed(2) : 0;
	const scope2Percentage = total > 0 ? ((scope2 / total) * 100).toFixed(2) : 0;
	const scope3usPercentage = total > 0 ? ((scope3us / total) * 100).toFixed(2) : 0;
	const scope3dsPercentage = total > 0 ? ((scope3ds / total) * 100).toFixed(2) : 0;
	const biogenicPercentage = total > 0 ? ((biogenic / total) * 100).toFixed(2) : 0;
	const fossilPercentage = total > 0 ? ((fossil / total) * 100).toFixed(2) : 0;

	const { values: scope1BarData, labels: scope1BarLabels } = useMemo(() => {
		let data = { labels: [], values: [] };
		if (!!activities?.scope1 && typeof activities?.scope1 === 'object') {
			const scopeValues = Object.values(activities.scope1);
			if (Array.isArray(scopeValues)) {
				data = scopeValues.reduce(
					(acc, curr) => {
						let values = [];
						const series = [];
						if (Array.isArray(curr)) {
							values = curr.map(({ emission, label, ...rest }) => {
								series.push(label);
								return emission;
							});
						}
						acc.values = acc.values.concat(values);
						acc.labels = acc.labels.concat(series);
						return acc;
					},
					{ labels: [], values: [] }
				);
			}
		}
		return data;
	}, [activities]);

	const { values: scope2BarData, labels: scope2BarLabels } = useMemo(() => {
		let data = { labels: [], values: [] };
		if (!!activities?.scope2 && typeof activities?.scope2 === 'object') {
			const scopeValues = Object.values(activities.scope2);
			if (Array.isArray(scopeValues)) {
				data = scopeValues.reduce(
					(acc, curr) => {
						let values = [];
						const series = [];
						if (Array.isArray(curr)) {
							values = curr.map(({ emission, label, ...rest }) => {
								series.push(label);
								return emission;
							});
						}
						acc.values = acc.values.concat(values);
						acc.labels = acc.labels.concat(series);
						return acc;
					},
					{ labels: [], values: [] }
				);
			}
		}
		return data;
	}, [activities]);

	const { values: scope3usBarData, labels: scope3usBarLabels } = useMemo(() => {
		let data = { labels: [], values: [] };
		if (!!activities?.scope3us && typeof activities?.scope3us === 'object') {
			const scopeValues = Object.values(activities.scope3us);
			if (Array.isArray(scopeValues)) {
				data = scopeValues.reduce(
					(acc, curr) => {
						let values = [];
						const series = [];
						if (Array.isArray(curr)) {
							values = curr.map(({ emission, label, ...rest }) => {
								series.push(label);
								return emission;
							});
						}
						acc.values = acc.values.concat(values);
						acc.labels = acc.labels.concat(series);
						return acc;
					},
					{ labels: [], values: [] }
				);
			}
			
		}
		return data;
	}, [activities]);

	const { values: scope3dsBarData, labels: scope3dsBarLabels } = useMemo(() => {
		let data = { labels: [], values: [] };
		if (!!activities?.scope3ds && typeof activities?.scope3ds === 'object') {
			const scopeValues = Object.values(activities.scope3ds);
			if (Array.isArray(scopeValues)) {
				data = scopeValues.reduce(
					(acc, curr) => {
						let values = [];
						const series = [];
						if (Array.isArray(curr)) {
							values = curr.map(({ emission, label, ...rest }) => {
								series.push(label);
								return emission;
							});
						}
						acc.values = acc.values.concat(values);
						acc.labels = acc.labels.concat(series);
						return acc;
					},
					{ labels: [], values: [] }
				);
			}
		}
		return data;
	}, [activities]);
	const pieChartData = [
		{ ...scopes.scope1, value: scope1 },
		{ ...scopes.scope2, value: scope2 },
		{ ...scopes.scope3us, value: scope3us },
		{ ...scopes.scope3ds, value: scope3ds }
	];

	const pieEmissionTypeData = [
		{ ...emissionTypes.biogenic, value: biogenic },
		{ ...emissionTypes.fossil, value: fossil }
	];
	return (
		<Grid className="p-4" container>
			<Grid item xs={12} className="py-2 flex flex-row items-center gap-4 justify-center ">
				<Typography variant="h6">Total Emmissions</Typography>
				<Typography color="primary" variant="body2">
					(tCO<sub>2</sub>e)
				</Typography>
			</Grid>
			<Grid item xs={12} className="my-8 flex justify-center items-end pb-8">
				<Typography variant="h3" color="primary">
					{total.toFixed(4)}
				</Typography>
			</Grid>
			<Grid item xs={12} md={5} className="p-5 flex justify-center items-center">
				<PieChart
					series={[
						{
							data: pieChartData,
							innerRadius: 100,
							// outerRadius: 100,
							paddingAngle: 5,
							cornerRadius: 5
						}
					]}
					margin={{ right: 5 }}
					width={300}
					height={300}
					slotProps={{
						legend: {
							hidden: true
						}
					}}
				>
					<PieCenterLabel>Scopes</PieCenterLabel>
				</PieChart>
			</Grid>
			<Grid item xs={12} md={7} className="p-5">
				<Box>
					<Card elevation={6}>
						<CardContent>
							<Grid container>
								<Grid item xs={12}>
									<Box className="flex flex-row items-center py-4 gap-4">
										<Typography className="flex-1" variant="h5" color="textSecondary">
											Emissions by scope
										</Typography>
										<Typography color="textSecondary" variant="body2">
											tCO<sub>2</sub>e
										</Typography>
									</Box>
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
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Box>
			</Grid>

			<Grid item xs={12} md={7} className="p-5 flex flex-col items-center">
				<Box className="w-full">
					<Card elevation={6}>
						<CardContent>
							<Grid container>
								<Grid item xs={12}>
									<Box className="flex flex-row items-center py-4 gap-4">
										<Typography className="flex-1" variant="h5" color="textSecondary">
											Emissions by type
										</Typography>
										<Typography color="textSecondary" variant="body2">
											tCO<sub>2</sub>e
										</Typography>
									</Box>

									<Box className="py-2">
										<Box className="flex flex-row items-center gap-4">
											<Typography className="flex-1" variant="subtitle2" color="textSecondary">
												{emissionTypes.biogenic.label}
											</Typography>
											<Typography color="textSecondary" variant="subtitle2">
												{biogenic > 0 ? biogenic : '--.--'}
											</Typography>
										</Box>
										<Box className="flex flex-row items-center gap-4">
											<BorderLinearProgress
												variant="determinate"
												value={biogenicPercentage}
												className="flex-1"
												color={emissionTypes.biogenic.colorName}
											/>
											<Typography color="textSecondary" variant="body2">
												{biogenicPercentage}%
											</Typography>
										</Box>
									</Box>
									<Box className="py-2">
										<Box className="flex flex-row items-center gap-4">
											<Typography className="flex-1" variant="subtitle2" color="textSecondary">
												{emissionTypes.fossil.label}
											</Typography>
											<Typography color="textSecondary" variant="subtitle2">
												{fossil > 0 ? fossil : '--.--'}
											</Typography>
										</Box>
										<Box className="flex flex-row items-center gap-4">
											<BorderLinearProgress
												variant="determinate"
												value={fossilPercentage}
												className="flex-1"
												color={emissionTypes.fossil.colorName}
											/>
											<Typography color="textSecondary" variant="body2">
												{fossilPercentage}%
											</Typography>
										</Box>
									</Box>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Box>
			</Grid>

			<Grid item xs={12} md={5} className="p-5 flex justify-center items-center">
				<PieChart
					series={[
						{
							data: pieEmissionTypeData,
							innerRadius: 100,
							// outerRadius: 100,
							paddingAngle: 5,
							cornerRadius: 5
						}
					]}
					margin={{ right: 5 }}
					width={300}
					height={300}
					slotProps={{
						legend: {
							hidden: true
						}
					}}
				>
					<PieCenterLabel>{`Emmission Type`}</PieCenterLabel>
				</PieChart>
			</Grid>
			<Grid item xs={12} className="p-5">
				<Box className="flex flex-row items-center py-4 gap-4">
					<Typography className="flex-1" variant="h5" color="textSecondary">
						Emmissions by Scope 1s' activities
					</Typography>
				</Box>
				<Card elevation={6}>
					<CardContent>
						<Grid container>
							<Grid item xs={12}>
								<Box className="flex flex-row items-center gap-4">
									<Typography className="flex-1" variant="subtitle2" color="textSecondary">
										tCO<sub>2</sub>e
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
							</Grid>
							<Grid item xs={12}>
								{scope1BarData.length > 0 && (
									<ResponsiveChartContainer
										height={250}
										xAxis={[{ scaleType: 'band', data: scope1BarLabels }]}
										series={[{ type: 'bar', data: scope1BarData }]}
										colors={new Array(scope1BarData.length).fill(scopes.scope1.color)}
									>
										<BarPlot />
										<ChartsXAxis />
										<ChartsYAxis />
										<ChartsTooltip />
									</ResponsiveChartContainer>
								)}
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} className="p-5">
				<Box className="flex flex-row items-center py-4 gap-4">
					<Typography className="flex-1" variant="h5" color="textSecondary">
						Emmissions by Scope 2s' activities
					</Typography>
				</Box>
				<Card elevation={6}>
					<CardContent>
						<Grid container>
							<Grid item xs={12}>
								<Box className="flex flex-row items-center gap-4">
									<Typography className="flex-1" variant="subtitle2" color="textSecondary">
										tCO<sub>2</sub>e
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
										color={scopes.scope2.colorName}
									/>
									<Typography color="textSecondary" variant="body2">
										{scope2Percentage}%
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={12}>
								{scope2BarData.length > 0 && (
									<ResponsiveChartContainer
										height={250}
										xAxis={[{ scaleType: 'band', data: scope2BarLabels }]}
										series={[{ type: 'bar', data: scope2BarData }]}
										colors={new Array(scope2BarData.length).fill(scopes.scope2.color)}
									>
										<BarPlot />
										<ChartsXAxis />
										<ChartsYAxis />
										<ChartsTooltip />
									</ResponsiveChartContainer>
								)}
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} className="p-5">
				<Box className="flex flex-row items-center py-4 gap-4">
					<Typography className="flex-1" variant="h5" color="textSecondary">
						{`Emmissions by ${scopes.scope3us.label}'s activities`}
					</Typography>
				</Box>
				<Card elevation={6}>
					<CardContent>
						<Grid container>
							<Grid item xs={12}>
								<Box className="flex flex-row items-center gap-4">
									<Typography className="flex-1" variant="subtitle2" color="textSecondary">
										tCO<sub>2</sub>e
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
										color={scopes.scope3us.colorName}
									/>
									<Typography color="textSecondary" variant="body2">
										{scope3usPercentage}%
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={12}>
								{scope3usBarData.length > 0 && (
									<ResponsiveChartContainer
										height={250}
										xAxis={[{ scaleType: 'band', data: scope3usBarLabels }]}
										series={[{ type: 'bar', data: scope3usBarData }]}
										colors={new Array(scope3usBarData.length).fill(scopes.scope3us.color)}
									>
										<BarPlot />
										<ChartsXAxis />
										<ChartsYAxis />
										<ChartsTooltip />
									</ResponsiveChartContainer>
								)}
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} className="p-5">
				<Box className="flex flex-row items-center py-4 gap-4">
					<Typography className="flex-1" variant="h5" color="textSecondary">
						{`Emmissions by ${scopes.scope3ds.label}'s activities`}
					</Typography>
				</Box>
				<Card elevation={6}>
					<CardContent>
						<Grid container>
							<Grid item xs={12}>
								<Box className="flex flex-row items-center gap-4">
									<Typography className="flex-1" variant="subtitle2" color="textSecondary">
										tCO<sub>2</sub>e
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
										color={scopes.scope3ds.colorName}
									/>
									<Typography color="textSecondary" variant="body2">
										{scope3dsPercentage}%
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={12}>
								{scope3dsBarData.length > 0 && (
									<ResponsiveChartContainer
										height={250}
										xAxis={[{ scaleType: 'band', data: scope3dsBarLabels }]}
										series={[{ type: 'bar', data: scope3dsBarData }]}
										colors={new Array(scope3dsBarData.length).fill(scopes.scope3ds.color)}
									>
										<BarPlot />
										<ChartsXAxis />
										<ChartsYAxis />
										<ChartsTooltip />
									</ResponsiveChartContainer>
								)}
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}
