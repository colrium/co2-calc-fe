/** @format */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ActivityCard from '../ActivityCard';
import factors from './factors.json';
export default function Scope3Downstream() {
	return (
		<Box component="form" className="flex p-4 flex-col">
			<Box className="my-2 flex flex-col gap-4">
				<Typography variant="h4">Scope 3 Downstream</Typography>
				<Typography paragraph>Indirect value-chain emissions after products or services leave company.</Typography>
				<Typography paragraph>
					Build your inventory of activities to calculate Scope 3 Downstream fossil emissions and non-Scope
					biogenic emissions. Either select from the list of predefined Emission Factors or use your own Custom
					Emission Factors.
				</Typography>
			</Box>
			<Box className="my-2 flex flex-col gap-4">
				<Box className="my-2 flex flex-col gap-4">
					{factors.map(({ name, label, types }, index) => (
						<ActivityCard types={types} name={name} label={label} key={`${name}-${index}`} />
					))}
				</Box>
			</Box>
		</Box>
	);
}
