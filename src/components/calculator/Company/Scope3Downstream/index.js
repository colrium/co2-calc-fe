/** @format */

import { useEffectOnce, useSetState } from '@/hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ActivityCard from '../../ActivityCard';
export default function Scope3Downstream() {
	const [state, setState] = useSetState({
		loading: true,
		factors: [],
		activities: []
	});

	useEffectOnce(() => {
		fetch('/api/activities/scope3ds')
			.then((res) => res.json())
			.then(({ activities }) => {
				setState({ activities });
			})
			.then((err) => console.error('/api/activities/scope3ds', err))
			.finally(() => setState({ loading: false }));
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
				{state.activities.map((activity, index) => (
					<ActivityCard {...activity} key={`${activity.id}-${index}`} />
				))}
			</Box>
		</Box>
	);
}
