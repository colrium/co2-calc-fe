const { createContext, useContext } = require("react");

const CalculatorContext = createContext({});

export const useCalculatorForm = () => {
    return useContext(CalculatorContext);
};

export default CalculatorContext.Provider;