import { createContext, useContext } from 'react';

export const ModelFormContext = createContext({});

export const useModelForm = () => {
	const context = useContext(ModelFormContext);
	return context;
};
const ModelFormProvider = ModelFormContext.Provider;
export default ModelFormProvider;