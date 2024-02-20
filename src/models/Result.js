import CalculatorForm from '@/components/calculator/CalculatorForm';
import BaseModel from './base/BaseModel';
export default class Result extends BaseModel {
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
			width: 240,
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
			field: 'description',
			header: 'Description',
		},
		{
			field: 'year',
			header: 'Year',
			required: true,
			type: 'number',
            min: 2000, 
            max: 2050
		},
		{
			field: 'total',
			header: 'Emmission',
            type: 'number',
			required: true
		}
	];
	static title = 'Result';
	static subtitle = `tCO2e results`;
	static endpoint = '/api/results';
	constructor(config = {}) {
		super({
			fields: Result.fields,
			title: Result.title,
			subtitle: Result.subtitle,
			endpoint: Result.endpoint,
			customizeSaveData: Result.customizeSaveData,
			Form: CalculatorForm,
			...config
		});
	}
}
