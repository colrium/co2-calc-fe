import dayjs from 'dayjs';
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
			default: 'biogenic',
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
			default: 0.1,
			type: 'number',
			valueGetter: (params) => {
				return params.row.custom ? params.row.emissionFactor : null;
			}
		},
		{
			field: 'unit',
			header: 'Unit',
			default: 't',
			required: true
		},
		{
			field: 'yearFrom',
			header: 'From',
			inputType: 'date',
			format: 'YYYY',
			valueGetter: ({value}) => {
				let year = value && parseInt(value)
				year = isNaN(year)? dayjs(value).year() : year
				const dte = year ? dayjs().year(year).startOf('year') : undefined;
				console.log('dte', dte)
				return dte
			},
			views: ['year'],
			openTo: 'year',
			onChange: (...args) => {
				console.log('yearFrom changed args', args)
			}
		},
		{
			field: 'yearTo',
			header: 'To',
			inputType: 'date',
			valueGetter: ({ value }) => {
				let year = value && parseInt(value)
				year = isNaN(year)? dayjs(value).year() : year
				const dte = year? dayjs().year(year).startOf('year') : undefined;
				return dte
			},
			views: ['year'],
			openTo: 'year',
		}
	];
	static title = 'Activity';
	static subtitle = `tCO2e-genarative activity`;
	static endpoint = '/api/activities';
	// static customizeSaveData = async ({ values, activeRecord }) => {
	// 	values.name = `${values.scope}_${values.label.toLowerCase().replace(' ', '_')}`;
	// 	return values;
	// };
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
