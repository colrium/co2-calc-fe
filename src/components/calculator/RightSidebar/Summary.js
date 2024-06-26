import ScalingText from '@/components/common/ScalingText';
import { emissionTypes } from '@/config';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useCalculatorForm } from '../CalculatorProvider';

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`& .${linearProgressClasses?.bar}`]: {
		borderRadius: 5
		// backgroundColor: theme.palette.mode === 'light' ? '#CCCCCC' : '#308fe8'
	},
	[`&.${linearProgressClasses?.root}`]: {
		borderRadius: 5,
		backgroundColor: `${theme.palette.divider} !important`
	}
}));

export default function Summary() {
	const { formik, onCloseForm } = useCalculatorForm();
	const {
		results, activities, total
	} = { ...formik.values };

	
	
	const scope1 = typeof results?.byScope?.scope1 === 'number' && !isNaN(results?.byScope?.scope1) ? results.byScope.scope1 : 0;
	const scope2 = typeof results?.byScope?.scope2 === 'number' && !isNaN(results?.byScope?.scope2) ? results.byScope.scope2 : 0;	
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
	// const total = (scope1 + scope2 + scope3us + scope3ds);
	// total = total > 0? total?.toFixed(2) : 0;
	const scope1Percentage = total > 0 ? ((scope1 / total) * 100)?.toFixed(2) : 0;
	const scope2Percentage = total > 0 ? ((scope2 / total) * 100)?.toFixed(2) : 0;
	const scope3usPercentage = total > 0 ? ((scope3us / total) * 100)?.toFixed(2) : 0;
	const scope3dsPercentage = total > 0 ? ((scope3ds / total) * 100)?.toFixed(2) : 0;
	const biogenicPercentage = total > 0 ? ((biogenic / total) * 100)?.toFixed(2) : 0;
	const fossilPercentage = total > 0 ? ((fossil / total) * 100)?.toFixed(2) : 0;

	


	return (
		<Box className="flex flex-col">
			<Box className="mb-4">
				<Box className="flex gap-2">
					<Typography color="textSecondary">CARBON FOOTPRINT</Typography>
					<Typography color="primary" compone="span">
						(tCO<sub>2</sub>e)
					</Typography>
				</Box>

				<ScalingText color="secondary" className="w-full">
					{total?.toFixed(2)}
				</ScalingText>
			</Box>
			<Divider />
			<Box className="flex flex-row items-center py-4 gap-4">
				<Typography className="flex-1" variant="subtitle2" color="textSecondary">
					Emissions by scope
				</Typography>
				<Typography color="primary" variant="body2">
					tCO<sub>2</sub>e
				</Typography>
			</Box>
			<Box className="py-2">
				<Box className="flex flex-row items-center gap-4">
					<Typography className="flex-1" variant="subtitle2" color="textSecondary">
						Scope 1
					</Typography>
					<Typography color="textSecondary" variant="subtitle2">
						{scope1 > 0 ? scope1?.toFixed(2) : '--.--'}
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
					<Typography className="flex-1" variant="subtitle2" color="textSecondary">
						Scope 2
					</Typography>
					<Typography color="textSecondary" variant="subtitle2">
						{scope2 > 0 ? scope2?.toFixed(2) : '--.--'}
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
						{scope3us > 0 ? scope3us?.toFixed(2) : '--.--'}
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
						{scope3ds > 0 ? scope3ds?.toFixed(2) : '--.--'}
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
			<Box className="py-2 mb-4">
				<Box className="flex flex-row items-center gap-4 mb-2">
					<Typography className="flex-1" variant="subtitle2" color="textSecondary">
						Emissions by type
					</Typography>
					<Typography color="textSecondary" variant="body2">
						tCO<sub>2</sub>e
					</Typography>
				</Box>
				<Box className="py-2">
					<Box className="flex flex-row items-center gap-4">
						<Typography className="flex-1" variant="subtitle2" color="textSecondary">
							Biogenic
						</Typography>
						<Typography color="textSecondary" variant="subtitle2">
							{biogenic > 0 ? biogenic?.toFixed(2) : '--.--'}
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
							Fossil
						</Typography>
						<Typography color="textSecondary" variant="subtitle2">
							{fossil > 0 ? fossil?.toFixed(2) : '--.--'}
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
			</Box>
			<Divider />
			<Typography color="textSecondary" variant="body2">
				Values above will update as you add activity data.
			</Typography>
			<Box className="py-4 flex item-center justify-center gap-4">
				<Button
					disableElevation
					startIcon={<SaveIcon />}
					onClick={formik.handleSubmit}
					size="small"
					variant="contained"
					color="success"
					type="button"
				>
					Save
				</Button>
				<Button
					disableElevation
					startIcon={<CloseIcon />}
					variant="contained"
					type="button"
					size="small"
					onClick={onCloseForm}
					color="error"
				>
					Cancel
				</Button>
			</Box>
		</Box>
	);
}
