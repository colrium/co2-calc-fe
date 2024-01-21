/** @format */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ActivityCard from '../ActivityCard';
import { useCalculatorForm } from '../CalculatorProvider';
import factors from './factors.json';
export default function Scope2() {
	const { formik } = useCalculatorForm();
	
	return (
		<Box className="flex p-4 flex-col">
			<Box className="my-2 flex flex-col gap-4">
				<Typography variant="h4">Scope 2</Typography>
				<Typography paragraph>Indirect emissions from purchased energy.</Typography>
				<Typography paragraph>
					Build your inventory of activities to calculate Scope 2 fossil emissions and non-Scope biogenic
					emissions.
				</Typography>
				<Typography paragraph>
					Calculate Scope 2 emissions with the Market-based (energy supplier specific) and/or Location-based
					(regional specific) approach. Either select from the list of predefined Emission Factors or use your own
					Custom Emission Factors.
				</Typography>
			</Box>
			<Box className="my-2 flex flex-col gap-4">
				{factors.map(({ name, label, types }, index) => (
					<ActivityCard types={types} name={name} label={label} key={`${name}-${index}`} />
				))}
			</Box>
		</Box>
	);
}
