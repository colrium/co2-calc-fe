import InternalLayout from '@/layouts/Internal';
import QueryEditor from '@/models/base/ModelDataGrid/QueryEditor';
import { Grid, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { formatQuery } from 'react-querybuilder';

const Page = () => {
    const [state, setState] = useState({
		query: {}
	});

	const onChange = useCallback((query) => {
    console.log('query', query)
		setState({query});
	}, []);

	return (
		<Grid container padding={2}>
			<Grid item xs={12} padding={2}>
				<Typography variant="h5">Report</Typography>
			</Grid>
			<Grid item xs={12}>
				<QueryEditor value={state.query} onChange={onChange} />
				<div className="query-builder-result">
					<div>
						Query string: <pre>{JSON.stringify(state.query)}</pre>
					</div>
					<div>
						MongoDb query: <pre>{formatQuery(state.query, 'mongodb')}</pre>
					</div>
					<div>
						SQL where: <pre>{JSON.stringify(formatQuery(state.query, 'sql'))}</pre>
					</div>
					<div>
						elasticsearch: <pre>{JSON.stringify(formatQuery(state.query, 'elasticsearch'))}</pre>
					</div>
				</div>
			</Grid>
		</Grid>
	);
};
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
export default Page;
