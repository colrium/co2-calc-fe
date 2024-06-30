import axios from 'axios';
import dayjs from 'dayjs';
import { forwardRef } from 'react';
import * as Yup from 'yup';
import CrudBase from './CrudBase';
import BaseForm from './Form';
import FieldMappers from './Form/FieldMappers';
import ModelDataGrid from './ModelDataGrid';
const relativeTime = require('dayjs/plugin/relativeTime');
const utc = require('dayjs/plugin/utc');
dayjs.extend(relativeTime);
dayjs.extend(utc);
export default class BaseModel {
	idField = 'id';
	formTitleValue = 'name';
	constructor(config = {}) {
		this.init(config);
	}
	init(config = {}) {
		const columns = [];
		const inputFields = [];
		const fieldNames = [];
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
				fieldNames.push();
				if (!field.excludeOnGrid) {
					columns.push(field);
				}
				if (!field.excludeOnForm) {
					inputFields.push(field);
				}
			});
		}
		if (!columns.find(column => column.field === 'createdAt')) {
			columns.push({
				field: 'createdAt',
				headerName: 'Created At',
				type: 'dateTime',
				flex: 1,
				valueGetter: ({ row: { createdAt } }) => {
					if (createdAt) {
						return dayjs.utc(createdAt).toDate();
					}
					return;
				}
			});
		}
		if (!columns.find((column) => column.field === 'updatedAt')) {
			columns.push({
				field: 'updatedAt',
				headerName: 'Updated At',
				type: 'dateTime',
				flex: 1,
				valueGetter: ({ row: { updatedAt } }) => {
					if (updatedAt) {
						return dayjs.utc(updatedAt).toDate();
					}
					return;
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
			if ('hide' in field) {
				hidden = Boolean(field.hide);
			}

			acc[field.field] = !hidden;
			return acc;
		}, {});
	}
	getValidationSchema({ data, lookups  }) {
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
				validationConfig = validationConfig.min(min, `${label} must be at least  ${min} characters`);
			}
			if (max) {
				validationConfig = validationConfig.max(max, `${label} must be at most ${max} characters`);
			}
			if (maxLength) {
				validationConfig = validationConfig.max(maxLength, `${label} must be at most ${max} characters`);
			}
			if (minLength) {
				validationConfig = validationConfig.min(minLength, `${label} must be at least  ${min} characters`);
			}
			if (validate) {
				if (typeof validate === 'object') {
					validationConfig = validate;
				} else if (typeof validate === 'function') {
					validationConfig = validate({data, lookups});
				} else if (typeof validate === 'string') {
					const [validationName, validateFieldName] = validate.split(':');
					const validateField = validateFieldName
						? fields.find((entry => entry.name === validateFieldName))
						: undefined;
					switch (validationName) {
						case 'match':
							validationConfig = validationConfig.oneOf(
								[Yup.ref(validateFieldName), null, undefined],
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
	async load(id, opts = {}) {
		const options = {...opts}
		const endpoint = this.endpoint;
		return await axios.get(`${endpoint}/${id}`, options).then((res) => {
			return res.data;
		});
	}
	evalInputComponents({ lookups, data, include=[], exclude=[] }) {
		let arr = [];
		const model = this;
		if (Array.isArray(model.fields)) {
			arr = model.fields
				.filter((entry) => {
					let includeField = entry.name !== model.idField && !entry.excludeOnForm;
					if (Array.isArray(include) && include.length) {
						includeField = include.includes(entry.name);
					}
					if (includeField && Array.isArray(exclude) && exclude.length) {
						includeField = !exclude.includes(entry.name);
					}
					return includeField;
				})
				.map((field) => {
					let fieldConfig = {
						name: field.field,
						label: field.header
					};
					const inputType = field.inputType || field.type;
					let getComponent = inputType in FieldMappers ? FieldMappers[inputType] : FieldMappers.invalid;
					if (field.lookup) {
						if (typeof field.lookup === 'string') {
							fieldConfig.valueOptions = lookups?.[field.lookup] || [];
						}
						if (!field.inputType) {
							getComponent = FieldMappers.select;
						}
					}
					if (field.valueOptions) {
						if (typeof field.valueOptions === 'string') {
							fieldConfig.valueOptions = lookups?.[field.options] || [];
						}
						if (!field.inputType) {
							getComponent = FieldMappers.radio;
						}
					}
					if (field.secure) {
						getComponent = FieldMappers.password;
					}
					return { ...field, ...fieldConfig, Component: getComponent(fieldConfig) };
				});
		}
		return arr;
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