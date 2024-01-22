import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	product: [],
	company: [],
	context: {name: 'company', active: -1, step: 0}
};

export const calculatorSlice = createSlice({
	name: 'calculator',
	initialState,
	reducers: {
		setCalculatorContext(state, action) {
			state.context = { ...state.context, ...action.payload };
		},
		addCompanyAssessment(state, action) {
			state.company = state.company.concat([action.payload]);
		},
		updateCompanyAssessment(state, action) {
			if (typeof action.payload.index === 'number' && typeof action.payload.value === 'object') {
				state.company[action.payload.index] = { ...state.company[action.payload.index], ...action.payload.value };
			}
		},
		deleteCompanyAssessment(state, action) {
			let indexOfAssessment = typeof action.payload === 'number' ? action.payload : -1;
			state.company = state.company;
		},
		clearCompanyAssessments(state, action) {
			state.company = [];
		},
		addProductAssessment(state, action) {
			state.product = state.product.concat([action.payload]);
		},
		updateProductAssessment(state, action) {
			if (typeof action.payload.index === 'number' && typeof action.payload.value === 'object') {
				state.product[action.payload.index] = { ...state.product[action.payload.index], ...action.payload.value };
			}
		},
		deleteProductAssessment(state, action) {
			let indexOfAssessment = typeof action.payload === 'number' ? action.payload : -1;
			state.product = state.product;
		},
		clearProductAssessments(state, action) {
			state.product = [];
		}
	}
});

export const {
	setCalculatorContext,
	setCompanyActiveAssessment,
	addCompanyAssessment,
	updateCompanyAssessment,
	deleteCompanyAssessment,
	clearCompanyAssessments,
	setActiveProductAssessment,
	addProductAssessment,
	updateProductAssessment,
	deleteProductAssessment,
	clearProductAssessments
} = calculatorSlice.actions;

export const selectCalculator = (state) => ({ ...initialState, ...state.calculator });

export default calculatorSlice.reducer;
