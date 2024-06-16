import { title } from '@/config';
import { useSetState } from '@/hooks';
import Head from 'next/head';

const { createContext, useContext, useCallback } = require('react');

export const LayoutContext = createContext({
	title: title
});
export const useLayout = () => {
	return useContext(LayoutContext);
};

const LayoutProvider = ({ children }) => {
	const [state, setState] = useSetState({
		title: title,
		subTitle: ''
	});
	const setSubtitle = useCallback((subtitle) => {
		setState({ subtitle });
	});
	return (
		<LayoutContext.Provider value={{ ...state, setSubtitle }}>
			<Head>
				<title>{`${state.title} | ${state.subtitle}`}</title>
			</Head>
			{children}
		</LayoutContext.Provider>
	);
};
export default LayoutProvider;
