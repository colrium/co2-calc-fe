import BaseModel from './base/BaseModel';
export default class Target extends BaseModel {
	static fields = [
		{
			field: 'id',
			header: 'ID',
			hide: true
		},
		{
			field: 'year',
			header: 'Year',
			type: 'number',
			min: 2000,
			max: 2050,
			required: true
		},
		{
			field: 'amount',
			header: 'tCO2e',
			type: 'number'
		},
		{
			field: 'domain',
			header: 'Domain',
			required: true,
			lookup: 'Domain'
		}
	];
	static title = 'Target';
	static subtitle = 'Green house gas emmission Goals';
	static endpoint = '/api/targets';
	constructor(config = {}) {
		super({
			fields: Target.fields,
			title: Target.title,
			subtitle: Target.subtitle,
			endpoint: Target.endpoint,
			...config
		});
	}
}
