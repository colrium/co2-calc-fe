import CalculatorForm from '@/components/calculator/CalculatorForm';
import { useFetcher, useSetState } from '@/hooks';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function CalculateId() {
	const router = useRouter();
	const id = router.query.slug;
	const [state, setState] = useSetState({loading: true, page: 1, perPage: 50, count: 0, data: []});
	const fetcher = useFetcher();
	const fetchResults = (type='company') => {
			setState({ loading: true});
			fetcher(`/api/results`)
				.then((res) => res.json())
				.then((results) => {
					debugger
					setState(results);
				})
				.catch((err) => console.error(`/api/results?type`, err))
				.finally(() => setState({ loading: false }));
		
	};
	useEffect(() => {
		fetchResults();
	}, [])
	return <Box className="w-full">{!state.loading && <CalculatorForm id={id} rows={state.data} />}</Box>;
}
