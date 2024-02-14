import CalculatorForm from '@/components/calculator/CalculatorForm';
import { useFetcher, useSetState } from '@/hooks';
import { Box, Grid } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function CalculateId() {
	const router = useRouter();
	const id = router.query.slug;
	const [state, setState] = useSetState({loading: false, page: 1, perPage: 50, count: 0, data: []});
	const fetcher = useFetcher();
	const fetchResults = (type='company') => {
			setState({ loading: true});
			axios.get(`/api/results`)
				.then(({data: results}) => {
					setState(results);
				})
				.catch((err) => console.error(`/api/results?type`, err))
				.finally(() => setState({ loading: false }));
		
	};
	useEffect(() => {
		// fetchResults();
	}, [])
	return (
		<Grid container>
			<Grid item xs={12}>
				{state.loading && <Box> 
				
				</Box>}
				{!state.loading && <CalculatorForm id={id} />}
			</Grid>
		</Grid>
	);
}
