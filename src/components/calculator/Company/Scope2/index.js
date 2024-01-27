/** @format */

import { useUniqueEffect } from '@/hooks';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ActivityCard from '../../ActivityCard';
import { useCalculatorForm } from '../../CalculatorProvider';
export default function Scope2() {
	const {
		activityTypes: { loading, scope2 },
		fetchActivityTypes
	} = useCalculatorForm();

	useUniqueEffect(() => {
		fetchActivityTypes('scope2');
	}, []);
	return (
		<Box className="flex p-4 flex-col">
			<Box className="my-2 flex gap-4">
				<Box className=" flex flex-col gap-4 justify-center">
					<Typography variant="h4">Scope 2</Typography>
					<Typography paragraph>Indirect emissions from purchased energy.</Typography>
					<Typography paragraph>
						Build your inventory of activities to calculate Scope 2 fossil emissions and non-Scope biogenic
						emissions.
					</Typography>
					<Typography paragraph>
						Calculate Scope 2 emissions with the Market-based (energy supplier specific) and/or Location-based
						(regional specific) approach. Either select from the list of predefined Emission Factors or use your
						own Custom Emission Factors.
					</Typography>
				</Box>
			</Box>
			<Box className="my-2 flex flex-col gap-4">
				{loading === 'scope2' && (
					<Box className="p-6 h-64 w-full flex items-center justify-center">
						<CircularProgress size={24} />
					</Box>
				)}
				{loading !== 'scope2' &&
					scope2?.map((type, index) => <ActivityCard {...type} scope={'scope2'} key={`${type.id}-${index}`} />)}
			</Box>
		</Box>
	);
}