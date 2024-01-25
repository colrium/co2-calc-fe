/** @format */

import { useUniqueEffect } from '@/hooks';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ActivityCard from '../../ActivityCard';
import { useCalculatorForm } from '../../CalculatorProvider';
export default function Scope3Downstream() {
	const {
		activityTypes: { loading, scope3ds },
		fetchActivityTypes
	} = useCalculatorForm();

	useUniqueEffect(() => {
		fetchActivityTypes('scope3ds');
	}, []);
	return (
		<Box className="flex p-4 flex-col">
			<Box className="my-2 flex gap-4">
				<Box className=" flex flex-col gap-4 justify-center">
					<Typography variant="h4">Scope 3 Downstream</Typography>
					<Typography paragraph>
						Indirect value-chain emissions after products or services leave company.
					</Typography>
					<Typography paragraph>
						Build your inventory of activities to calculate Scope 3 Downstream fossil emissions and non-Scope
						biogenic emissions. Either select from the list of predefined Emission Factors or use your own Custom
						Emission Factors.
					</Typography>
				</Box>
			</Box>
			<Box className="my-2 flex flex-col gap-4">
				{loading === 'scope3ds' && <Box className="p-6 h-64 w-full flex items-center justify-center">
					<CircularProgress size={24} />
				</Box>}
				{loading !== 'scope3ds' && scope3ds?.map((type, index) => <ActivityCard {...type} key={`${type.id}-${index}`} />)}
			</Box>
		</Box>
	);
}