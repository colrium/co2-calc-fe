const { createContext, useContext } = require("react");

export const ModelDataGridContext = createContext({});
export const useModelDataGrid = () => {
    return useContext(ModelDataGridContext);
};

const ModelDataGridProvider = ModelDataGridContext.Provider;
export default ModelDataGridProvider;