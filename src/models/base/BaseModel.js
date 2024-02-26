import axios from 'axios';
import { forwardRef } from 'react';
import * as Yup from 'yup';
import CrudBase from './CrudBase';
import BaseForm from './Form';
import ModelDataGrid from './ModelDataGrid';
export default class BaseModel {
	idField = 'id';
	constructor(config = {}) {
		this.init(config);
	}
	init(config = {}) {
		const columns = [];
		const inputFields = [];
		if (Array.isArray(config.fields)) {
			config.fields.forEach((field) => {
				if (!field.type) {
					field.type = 'string';
				}
				if (['email', 'url'].includes(field.type)) {
					field.maskedType = field.type;
					field.type = 'string';
				}
				if (!('width' in field)) {
					field.flex = 1;
				}
				if ('options' in field) {
					field.valueOptions = field.options;
				}
				field.headerName = field.headerName || field.header;
				field.name = field.name || field.field;
				field.label = field.label || field.header;
				if (!field.excludeOnGrid) {
					columns.push(field)
				}
				if (!field.excludeOnForm) {
					inputFields.push(field);
				}
			});
		
		}
		Object.assign(this, config);
		this.columns = columns;
		this.inputFields = inputFields; 
		this.Form = config?.Form || this.createForm();
		this.CrudBase = this.createCrudBase();
		this.DataGrid = this.createDataGrid();
	}
	getInitialGridColumnVisibilityModel() {
		const columns = this.columns || [];
		return columns.reduce((acc, field) => {
			let hidden = false;
			if ('hide' in field ) {
				hidden = Boolean(field.hide);				
			}
			
			acc[field.field] = !hidden;
			return acc
		}, {});
	}
	getValidationSchema({ activeRecord }) {
		const validations = {};
		const fields = this.fields;
		for (const field of fields) {
			const { type = 'string', required, label, name, validate, min, max, maskedType, maxLength, minLength } = field;
			let validationConfig = Yup.string().nullable(true);
			if (type === 'number') {
				validationConfig = Yup.number().nullable(true);
			}
			if (type === 'boolean') {
				validationConfig = Yup.boolean();
			}
			if (type === 'date' || type === 'dateTime') {
				validationConfig = Yup.date().nullable(true);
			}
			if (maskedType === 'email') {
				validationConfig = Yup.string().nullable(true).email(`${label} is not a valid email`);
			}

			if (required) {
				validationConfig = validationConfig.required(`${label} is required`);
			}
			if (min) {
				validationConfig = validationConfig.min(`${label} minimum is ${min}`);
			}
			if (max) {
				validationConfig = validationConfig.max(`${label} maximum is ${max}`);
			}
			if (maxLength) {
				validationConfig = validationConfig.max(`${label} maximum legth is ${maxLength}`);
			}
			if (minLength) {
				validationConfig = validationConfig.min(`${label} minimum length is ${minLength}`);
			}
			if (validate) {
				if (typeof validate === 'object') {
					validationConfig = validate;
				} else if (typeof validate === 'string') {
					const [validationName, validateFieldName] = validate.split(':');
					const validateField = validateFieldName
						? fields.find((entry = entry.name === validateFieldName))
						: undefined;
					switch (validationName) {
						case 'matches':
							validationConfig = validationConfig.oneOf(
								[Yup.ref('validateFieldName'), null, undefined],
								`${label} should match ${validateField?.label || validateFieldName}`
							);
							break;
						default:
							break;
					}
				}
			}
			validations[name] = validationConfig;
		}
		return Yup.object(validations);
	}
	async list(params = {}) {
		const endpoint = this.endpoint;
		return await axios.get(endpoint, { params }).then((res) => {
			return res.data;
		});
	}
	async load(id, params = {}) {
		const endpoint = this.endpoint;
		return await axios.get(`${endpoint}/${id}`, { params }).then((res) => {
			return res.data;
		});
	}

	createDataGrid() {
		return forwardRef((props, ref) => <ModelDataGrid {...props} model={this} ref={ref} />);
	}
	createForm() {
		return forwardRef((props, ref) => <BaseForm {...props} model={this} ref={ref} />);
	}
	createCrudBase() {
		return forwardRef((props, ref) => <CrudBase {...props} model={this} ref={ref} />);
	}
}