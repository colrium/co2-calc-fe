/** @format */

import { emissionTypes, scopes } from '@/config';
import { useSetState } from '@/hooks';
import { NoRowsOverlay } from '@/models/base/ModelDataGrid';
import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { BarPlot, ChartsTooltip, ChartsXAxis, ChartsYAxis, PieChart, ResponsiveChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';
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
export default function Overview({ name, options = [] }) {
	const theme = useTheme();
	const [state, setState] = useSetState({
		loading: true,
		yearly: { labels: [], values: [] },
		domains: { labels: [], values: [] },
		activities: { labels: [], values: [] },
		activityTypes: { labels: [], values: [] },
		total: 0,
		count: 0,
		activityCount: 0,
		domainCount: 0,
		calculationCount: 0,
		emissionType: [],
		scopes: {
			bar: {
				labels: ['Scope 1', 'Scope 2', 'Scope 3 Upstream', 'Scope 3 Downstream'],
				values: [0, 0, 0, 0],
				colors: [scopes.scope1.color, scopes.scope2.color, scopes.scope3us.color, scopes.scope3ds.color]
			},
			pie: [
				{ ...scopes.scope1, value: 0 },
				{ ...scopes.scope2, value: 0 },
				{ ...scopes.scope3us, value: 0 },
				{ ...scopes.scope3ds, value: 0 }
			]
		},
		overview: {
			scope: { scope1: 0, scope2: 0, scope3us: 0, scope3ds: 0 },
			emissionType: { biogenic: 0, fossil: 0 },
			total: 0
		}
	});
	const fetchOverview = () => {
		setState({ loading: true });
		axios
			.get(`/api/overview`)
			.then(({ data: overview }) => {
				
				const domains = { labels: Object.keys(overview.domains), values: Object.values(overview.domains) };
				const activities = { labels: Object.keys(overview.activities), values: Object.values(overview.activities) };
				const yearly = { labels: Object.keys(overview.yearly), values: Object.values(overview.yearly) };
				const emissionType = Object.entries(overview.emissionType).map(([label, value]) => ({ ...emissionTypes[label], label, value, }));
				const activityTypes = {
					labels: Object.keys(overview.activityTypes),
					values: Object.values(overview.activityTypes)
				};
				setState((prevState) => ({
					yearly,
					activities,
					domains,
					activityTypes,
					domainCount: overview.domainCount || 0,
					calculationCount: overview.calculationCount || 0,
					total: overview.total || 0,
					activityCount: overview.activityCount || 0,
					emissionType: emissionType,
					scopes: {
						...prevState.scopes,
						bar: {
							...prevState.scopes.bar,
							values: [
								overview.scope?.scope1 || 0,
								overview.scope?.scope2 || 0,
								overview.scope?.scope3us || 0,
								overview.scope?.scope3ds || 0
							]
						},

						pie: [
							{ ...scopes.scope1, value: overview.scope?.scope1 || 0 },
							{ ...scopes.scope2, value: overview.scope?.scope2 || 0 },
							{ ...scopes.scope3us, value: overview.scope?.scope3us || 0 },
							{ ...scopes.scope3ds, value: overview.scope?.scope3ds || 0 }
						]
					},
					overview: overview
				}));
			})
			.catch((err) => console.error(`/api/overview`, err))
			.finally(() => setState({ loading: false }));
	};
	useEffect(() => {
		fetchOverview();
	}, []);
	return (
		<Grid container>
			<Grid item xs={12} className="flex p-8">
				<Typography variant="subtitle1">Overview</Typography>
			</Grid>
			<Grid item xs={12} className="flex p-8">
				<Box className={'flex flex-col md:flex-row gap-4 w-full'}>
					<Box className="flex-1">
						<Card className="flex flex-col w-full h-40" variant="outlined">
							<CardHeader title={'Total Emissions'} />
							<CardContent>
								<Typography variant="h3" textAlign={'center'} color="primary">
									{state.total}
								</Typography>
							</CardContent>
						</Card>
					</Box>
					<Box className="flex-1">
						<Card
							component={Link}
							href="/dashboard/calculations"
							className="flex flex-col w-full h-40"
							variant="outlined"
						>
							<CardHeader title={'Calculations'} />
							<CardContent>
								<Typography variant="h3" textAlign={'center'} color="secondary">
									{state.calculationCount}
								</Typography>
							</CardContent>
						</Card>
					</Box>
					<Box className="flex-1">
						<Card
							component={Link}
							href="/dashboard/activities"
							className="flex flex-col w-full h-40"
							variant="outlined"
						>
							<CardHeader title={'Activities'} />
							<CardContent className="flex flex-col items-center justify-center">
								<Typography variant="h3" textAlign={'center'} color="teal.main">
									{state.activityCount}
								</Typography>
							</CardContent>
						</Card>
					</Box>
					<Box className="flex-1">
						<Card
							component={Link}
							href="/dashboard/domains"
							className="flex flex-col w-full h-40"
							variant="outlined"
						>
							<CardHeader title={'Domains'} />
							<CardContent className="flex flex-col items-center justify-center">
								<Typography variant="h3" textAlign={'center'} color="orange.main">
									{state.domainCount}
								</Typography>
							</CardContent>
						</Card>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} md={6} columnGap={1} className="flex items-center p-8">
				<Card className="w-full">
					<CardHeader title={'Annual Totals'} />
					<CardContent>
						{state.yearly.values?.length > 0 && (
							<ResponsiveChartContainer
								height={420}
								series={[{ type: 'line', data: state.yearly.values, connectNulls: true }]}
								xAxis={[{ scaleType: 'point', data: state.yearly.labels }]}
							>
								<LinePlot />
								<MarkPlot tooltip={{ trigger: 'item' }} />
								<ChartsXAxis label="Year" />
								<ChartsYAxis label="tCO2e" />
								<ChartsTooltip />
							</ResponsiveChartContainer>
						)}
						{state.yearly.values?.length === 0 && (
							<Box height={420} className="flex items-center justify-center flex-col">
								<NoRowsOverlay message="No data available yet" />
							</Box>
						)}
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6} className="flex items-center p-8">
				<Card className="w-full">
					<CardHeader title={'Scope Totals'} />
					<CardContent className="flex w-full items-center justify-center">
						{Object.keys(state.scopes.pie)?.length > 0 && (
							<Box width={300} height={420}>
								<PieChart
									series={[
										{
											data: state.scopes.pie,
											innerRadius: 120,
											// outerRadius: 100,
											paddingAngle: 5,
											cornerRadius: 5
										}
									]}
									margin={{ right: 5, left: 5 }}
									slotProps={{
										legend: {
											hidden: true
										}
									}}
								>
									<PieCenterLabel>By Scope</PieCenterLabel>
								</PieChart>
							</Box>
						)}
						{state.yearly.values?.length === 0 && (
							<Box height={420} className="flex items-center justify-center flex-col">
								<NoRowsOverlay message="No data available yet" />
							</Box>
						)}
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6} className="flex items-center p-8">
				<Card className="w-full">
					<CardHeader title={'Emission Type'} />
					<CardContent className="flex w-full items-center justify-center">
						{Object.keys(state.emissionType)?.length > 0 && (
							<Box width={300} height={420}>
								<PieChart
									series={[
										{
											data: state.emissionType,
											innerRadius: 120,
											// outerRadius: 100,
											paddingAngle: 5,
											cornerRadius: 5
										}
									]}
									margin={{ right: 5, left: 5 }}
									slotProps={{
										legend: {
											hidden: true
										}
									}}
								>
									<PieCenterLabel>By Type</PieCenterLabel>
								</PieChart>
							</Box>
						)}
						{Object.keys(state.emissionType)?.length === 0 && (
							<Box height={420} className="flex items-center justify-center flex-col">
								<NoRowsOverlay message="No data available yet" />
							</Box>
						)}
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6} columnGap={1} className="flex items-center p-8">
				<Card className="w-full">
					<CardHeader title={'Activity Types'} />
					<CardContent>
						{state.activityTypes.values?.length > 0 && (
							<ResponsiveChartContainer
								height={420}
								series={[{ type: 'bar', data: state.activityTypes.values, connectNulls: true }]}
								xAxis={[{ scaleType: 'band', data: state.activityTypes.labels }]}
							>
								<BarPlot color={theme.palette.primary.main} />
								<ChartsXAxis label="Activity type" />
								<ChartsYAxis label="tCO2e" />
								<ChartsTooltip />
							</ResponsiveChartContainer>
						)}
						{state.activityTypes.values?.length === 0 && (
							<Box height={420} className="flex items-center justify-center flex-col">
								<NoRowsOverlay message="No data available yet" />
							</Box>
						)}
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6} columnGap={1} className="flex items-center p-8">
				<Card className="w-full">
					<CardHeader title={'Emissions by Activity'} />
					<CardContent>
						{state.activities.values?.length > 0 && (
							<ResponsiveChartContainer
								height={420}
								series={[{ type: 'bar', data: state.activities.values, connectNulls: true }]}
								xAxis={[{ scaleType: 'band', data: state.activities.labels }]}
							>
								<BarPlot color={theme.palette.secondary.main} tooltip={{ trigger: 'item' }} />
								<ChartsXAxis label="Activity" />
								<ChartsYAxis label="tCO2e" />
								<ChartsTooltip />
							</ResponsiveChartContainer>
						)}
						{state.activities.values?.length === 0 && (
							<Box height={420} className="flex items-center justify-center flex-col">
								<NoRowsOverlay message="No data available yet" />
							</Box>
						)}
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6} columnGap={1} className="flex items-center p-8">
				<Card className="w-full">
					<CardHeader title={'Domain Totals'} />
					<CardContent>
						{state.domains.values?.length > 0 && (
							<ResponsiveChartContainer
								height={420}
								series={[{ type: 'bar', data: state.domains.values }]}
								xAxis={[{ scaleType: 'band', data: state.domains.labels }]}
							>
								<BarPlot color={theme.palette.tertiary.main} />
								<ChartsXAxis label="Domain" />
								<ChartsYAxis label="tCO2e" />
								<ChartsTooltip />
							</ResponsiveChartContainer>
						)}
						{state.yearly.values?.length === 0 && (
							<Box height={420} className="flex items-center justify-center flex-col">
								<NoRowsOverlay message="No data available yet" />
							</Box>
						)}
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}
