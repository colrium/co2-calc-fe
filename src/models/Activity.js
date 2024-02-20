import BaseModel from './base/BaseModel';
export default class Activity extends BaseModel {
	static fields = [
		{
			field: 'id',
			header: 'ID',
			default: '0',
			hide: true
		},
		{
			field: 'name',
			header: 'Name',
			width: 240,
			required: true
		},
		{
			field: 'categoryName',
			header: 'Category Name'
		},
		{
			field: 'emissionType',
			header: 'Emission Type',
			required: true,
			options: [
				{ value: 'biogenic', label: 'Biogenic' },
				{ value: 'fossil', label: 'Fossil' }
			]
		},
		{
			field: 'emissionFactor',
			header: 'Emission Factor',
			required: true,
			type: 'number'
		},
		{
			field: 'unit',
			header: 'Unit',
			required: true
		},
		{
			field: 'yearFrom',
			header: 'From',
			type: 'number',
		
		},
		{
			field: 'yearTo',
			header: 'To',
			type: 'number',
			
		}
	];
	static title = 'Activity';
	static subtitle = `tCO2e-genarative activity`;
	static endpoint = '/api/activities';
	static customizeSaveData = async ({ values, activeRecord }) => {
		values.name = `${values.scope}_${values.label.toLowerCase().replace(' ', '_')}`;
		return values;
	};
	constructor(config = {}) {
		super({
			fields: Activity.fields,
			title: Activity.title,
			subtitle: Activity.subtitle,
			endpoint: Activity.endpoint,
			customizeSaveData: Activity.customizeSaveData,
			...config
		});
	}
}
