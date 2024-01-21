import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	assessments: [],
	product_assessment: [],
};

export const calculatorSlice = createSlice({
	name: 'calculator',
	initialState,
	reducers: {
		addAssessment(state, action) {
			state.assessments = state.assessments.concat([action.payload]);
		},
		deleteAssessment(state, action) {
			let indexOfAssessment = typeof action.payload === 'number' ? action.payload : -1;
			state.assessments = state.assessments;
		},
		clearAssessments(state, action) {
			state.assessments = [];
		},
		addProductAssessment(state, action) {
			state.product_assessment = state.product_assessment.concat([action.payload]);
		},
		deleteProductAssessment(state, action) {
			let indexOfAssessment = typeof action.payload === 'number' ? action.payload : -1;
			state.product_assessment = state.product_assessment;
		},
		clearProductAssessments(state, action) {
			state.product_assessment = [];
		}
	}
});

export const {
	addAssessment,
	deleteAssessment,
	clearAssessments,
	addProductAssessment,
	deleteProductAssessment,
	clearProductAssessments
} = calculatorSlice.actions;

export const selectCalculator = (state) => ({ ...initialState, ...state.calculator });

export default authSlice.reducer;
