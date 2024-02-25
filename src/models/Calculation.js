import CalculatorForm from '@/components/calculator/CalculatorForm';
import BaseModel from './base/BaseModel';
export default class Calculation extends BaseModel {
	static fields = [
		{
			field: 'id',
			header: 'ID',
			default: '0',
			hide: true
		},
		{
			field: 'type',
			header: 'Type',
			required: true,
			options: [
				{ value: 'company', label: 'Domain' },
				{ value: 'product', label: 'Product' }
			]
		},
		{
			field: 'name',
			header: 'Name',
			required: true
		},
		{
			field: 'domain',
			header: 'Domain',
			excludeOnForm: true
		},
		{
			field: 'domainId',
			header: 'Domain',
			excludeOnGrid: true
		},
		{
			field: 'year',
			header: 'Year',
			required: true,
			type: 'number'
		},
		{
			field: 'total',
			header: 'Emission',
			type: 'number'
		},
		{
			field: 'description',
			header: 'Description',
			hide: true
		}
	];
	static title = 'Calculations';
	static subtitle = `tCO2e calculations`;
	static endpoint = '/api/calculations';
	constructor(config = {}) {
		super({
			fields: Calculation.fields,
			title: Calculation.title,
			subtitle: Calculation.subtitle,
			endpoint: Calculation.endpoint,
			customizeSaveData: Calculation.customizeSaveData,
			Form: CalculatorForm,
			...config
		});
	}
}
