/** @format */

import Breadcrumbs from '@/components/landingpage/Breadcrumbs';
import { useSetState } from '@/hooks';
import ExternalLayout from '@/layouts/External';
import { Box, Button, Card, CardActions, CardContent, Chip, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

const scopeLabels = {
	scope1: 'Scope 1',
	scope2: 'Scope 2',
	scope3ds: 'Scope 3 Downstream',
	scope3us: 'Scope 3 Upstream'
};

export default function Page() {
	const [state, setState] = useSetState({
		loading: true,
		activityTypes: []
	});
	const fetchActivityTypes = () => {
		setState({ loading: true });
		axios.get(`/api/help`)
			.then(({ data: {data} }) => {
				
				setState({ activityTypes: data, loading: false });
			})
			.catch((err) => {
				console.error(`/api/activity-types`, err);
			})
			.finally(() => setState({ loading: false }));
	};
	useEffect(fetchActivityTypes, []);
	return (
		<Box className="flex min-h-screen flex-col">
			<Breadcrumbs title={'Help'} loading={state.loading} />
			<Container>
				<Box className="flex p-4 gap-4 flex-col">
					{state.activityTypes?.length > 0 &&
						state.activityTypes.map((activityType, i) => (
							<Card key={`activity-${i}`}>
								<CardContent>
									<Box className="p-2">
										<Chip color="secondary" label={scopeLabels[activityType.scope]} />
									</Box>
									<Typography variant="h5" component="div" className="mb-8" paragraph>
										{activityType.label}
									</Typography>
									<Typography sx={{ mb: 1.5 }} variant="subtitle2" color="text.secondary">
										Definition
									</Typography>
									<Typography variant="body2" component="div" paragraph gutterBottom>
										{activityType.definition}
									</Typography>
									<Typography sx={{ mb: 1.5 }} variant="subtitle2" color="text.secondary">
										Example
									</Typography>
									<Typography variant="body2" component="div">
										{activityType.example}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">Learn More</Button>
								</CardActions>
							</Card>
						))}
				</Box>
			</Container>
		</Box>
	);
}
Page.getLayout = (page) => {
	return <ExternalLayout>{page}</ExternalLayout>;
};