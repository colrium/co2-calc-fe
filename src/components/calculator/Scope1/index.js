/** @format */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ActivityCard from '../ActivityCard';
import factors from './factors.json';
export default function Scope1() {
	return (
		<Box  className="flex p-4 flex-col">
			<Box className="my-2 flex flex-col gap-4">
				<Typography variant="h4">Scope 1</Typography>
				<Typography paragraph>Direct emissions resulting from own activities.</Typography>
				<Typography paragraph>
					Build your inventory of activities to calculate Scope 1 fossil emissions and non-Scope biogenic
					emissions. Either select from the list of predefined Emission Factors or use your own Custom Emission
					Factors.
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
