/** @format */

import { useUniqueEffect } from '@/hooks';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ActivityCard from '../../ActivityCard';
import { useCalculatorForm } from '../../CalculatorProvider';
export default function Scope1() {
	const {
		activityTypes: { loading, scope1 },
		fetchActivityTypes
	} = useCalculatorForm();

	useUniqueEffect(() => {
		fetchActivityTypes('scope1');
	}, []);
	console.log('loading', loading)
	return (
		<Box className="flex p-4 flex-col">
			<Box className="my-2 flex gap-4">
				<Box className=" flex flex-col gap-4 justify-center">
					<Typography variant="h4">Scope 1</Typography>
					<Typography paragraph>Direct emissions resulting from own activities.</Typography>
					<Typography paragraph>
						Build your inventory of activities to calculate Scope 1 fossil emissions and non-Scope biogenic
						emissions. Either select from the list of predefined Emission Factors or use your own Custom Emission
						Factors.
					</Typography>
				</Box>
			</Box>
			<Box className="my-2 flex flex-col gap-4">
				{loading === 'scope1' && <Box className="p-6 h-64 w-full flex items-center justify-center">
					<CircularProgress size={24} />
				</Box>}
				{loading !== 'scope1' && scope1.map((type, index) => <ActivityCard {...type} key={`${type.id}-${index}`} />)}
			</Box>
		</Box>
	);
}
