const { createContext, useContext } = require("react");

export const ModelGridContext = createContext({});
export const useModelGridContext = () => {
    return useContext(ModelGridContext);
};

const ModelGridContextProvider = ModelGridContext.Provider;
export default ModelGridContextProvider;