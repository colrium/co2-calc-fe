/** @format */

import { scopes } from '@/config';
import { useSetState } from '@/hooks';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChartsTooltip, ChartsXAxis, ChartsYAxis, PieChart, ResponsiveChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
	const router = useRouter();
	const dispatch = useDispatch();
	const [state, setState] = useSetState({
		loading: true,
		yearly: { labels: [], values: [] },
		total: 0,
		scopes: {
			bar: {
				labels: ['Scope 1', 'Scope 2', 'Scope 3 Upstream', 'Scope 3 Downstream'],
				values: [0, 0, 0, 0],
				colors: [scopes.scope1.color, scopes.scope2.color, scopes.scope3us.color, scopes.scope3ds.color]
			},
			pie: [
				{ ...scopes.scope1, value:  0 },
				{ ...scopes.scope2, value:  0 },
				{ ...scopes.scope3us, value:  0 },
				{ ...scopes.scope3ds, value:  0 }
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
				const yearly = { labels: Object.keys(overview.yearly), values: Object.values(overview.yearly) };
				setState((prevState) => ({
					yearly,
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
			
			<Grid item xs={12} md={6} className="flex items-center p-8">
				<ResponsiveChartContainer
					height={420}
					series={[{ type: 'line', data: state.yearly.values, connectNulls: true }]}
					xAxis={[{ scaleType: 'point', data: state.yearly.labels }]}
					disableAxisListener
				>
					<LinePlot />
					<MarkPlot />
					<ChartsXAxis label="Year" />
					<ChartsYAxis label="tCO2e" />
					<ChartsTooltip />
				</ResponsiveChartContainer>
			</Grid>
			<Grid item xs={12} md={6} className="flex items-center p-8">
				{/* <ResponsiveChartContainer
					height={350}
					series={[{ data: state.scopes.values, connectNulls: true, type: 'bar', colors: state.scopes.colors }]}
					xAxis={[{ scaleType: 'band', data: state.scopes.labels }]}
					colors={state.scopes.colors}
				>
					<BarPlot colors={state.scopes.colors} />
					<ChartsXAxis label="Scope" />
					<ChartsYAxis label="tCO2e" />
					<ChartsTooltip />
				</ResponsiveChartContainer> */}
				<PieChart
					series={[
						{
							data: state.scopes.pie,
							innerRadius: 100,
							outerRadius: 150,
							paddingAngle: 5,
							cornerRadius: 5
						}
					]}
					margin={{ right: 120 }}
					slotProps={{
						legend: {
							direction: 'column',
							position: { vertical: 'middle', horizontal: 'right' },
							padding: 0
						}
					}}
				>
					<PieCenterLabel>By Scope</PieCenterLabel>
				</PieChart>
			</Grid>
		</Grid>
	);
}
