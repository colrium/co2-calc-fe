import { ThemeProvider, useTheme } from '@mui/material/styles';
import { QueryBuilderMaterial } from '@react-querybuilder/material';
import { useCallback, useMemo } from 'react';
import { QueryBuilder } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';



const QueryEditor = ({ model, value = { combinator: 'and', rules: [] }, onChange }) => {
	const theme = useTheme();
	const query = useMemo(() => ({ combinator: 'and', rules: [], ...value }), [value]);
	const fields = useMemo(() => {
		let arr = [];
		if (Array.isArray(model?.fields)) {
			arr = model.fields.map(({field: name, label}) => {
				return {
					name, label
				}
			})
		}
		return arr;
	}, [model]);

	const handleOnChange = useCallback((newValue) => {
		if (typeof onChange === 'function') {
			onChange(newValue)
		}
	}, [onChange]);


	return (
		<ThemeProvider theme={theme}>
			<QueryBuilderMaterial>
				<QueryBuilder
					fields={fields}
					query={query}
					onQueryChange={handleOnChange}
					// controlElements={{ valueEditor: OutlinedInput}}
				/>
			</QueryBuilderMaterial>
		</ThemeProvider>
	);
};


export default QueryEditor;