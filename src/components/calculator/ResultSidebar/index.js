import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		// backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
	}
}));



export default function ResultsSidebar() {
	const [footprint, setFootprint] = useState(33.567)
	const [scope1Footprint, setScope1Footprint] = useState(20);
	const [scope2Footprint, setScope2Footprint] = useState(2);
	const [scope3UpFootprint, setScope3UpFootprint] = useState(0);
	const [scope3DownFootprint, setScope3DownFootprint] = useState(0);
	const scope1Percentage = footprint > 0 ? ((scope1Footprint / footprint) * 100).toFixed(2) : 0;
	const scope2Percentage = footprint > 0 ? ((scope2Footprint / footprint) * 100).toFixed(2) : 0;
	const scope3UpPercentage = footprint > 0 ? ((scope3UpFootprint / footprint) * 100).toFixed(2) : 0;
	const scope3DownPercentage = footprint > 0 ? ((scope3DownFootprint / footprint) * 100).toFixed(2) : 0;
	return (
		<Box className="flex flex-col">
			<Box className="mb-4">
				<Typography color="textSecondary">CARBON FOOTPRINT</Typography>
				<Typography color="secondary">
					<span className="text-7xl">{footprint}</span>tCO<sub>2</sub>e
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
						{scope1Footprint > 0 ? scope1Footprint : '--.--'}
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
						{scope2Footprint > 0 ? scope2Footprint : '--.--'}
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
						{scope3UpFootprint > 0 ? scope3UpFootprint : '--.--'}
					</Typography>
				</Box>
				<Box className="flex flex-row items-center gap-4">
					<BorderLinearProgress
						variant="determinate"
						value={scope3UpPercentage}
						className="flex-1"
						color="success"
					/>
					<Typography color="textSecondary" variant="body2">
						{scope3UpPercentage}%
					</Typography>
				</Box>
			</Box>

			<Box className="py-2 mb-4">
				<Box className="flex flex-row items-center gap-4">
					<Typography className="flex-1" variant="h6" color="textSecondary">
						Scope 3 Downstream
					</Typography>
					<Typography color="textSecondary" variant="h6">
						{scope3DownFootprint > 0 ? scope3DownFootprint : '--.--'}
					</Typography>
				</Box>
				<Box className="flex flex-row items-center gap-4">
					<BorderLinearProgress
						variant="determinate"
						value={scope3DownPercentage}
						className="flex-1"
						color="tertiary"
					/>
					<Typography color="textSecondary" variant="body2">
						{scope3DownPercentage}%
					</Typography>
				</Box>
			</Box>
			<Divider />
		</Box>
	);
}
