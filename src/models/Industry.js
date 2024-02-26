import BaseModel from './base/BaseModel';
export default class Industry extends BaseModel {
	static fields = [
		{
			field: 'id',
			header: 'ID',
			hide: true
		},
		{
			field: 'name',
			header: 'Name',
			required: true
		},
		{
			field: 'description',
			header: 'Description',
			multiline: true,
			minRows: 4,
			maxRows: 6
		},
		{
			field: 'annualAvgEmission',
			header: 'Annual Average Emission (tCO2e)',
			type: 'number',
			default: 0
		}
	];
	static title = 'Industry';
	static subtitle = 'GHG industries';
	static endpoint = '/api/industries';
	constructor(config = {}) {
		super({
			fields: Industry.fields,
			title: Industry.title,
			subtitle: Industry.subtitle,
			endpoint: Industry.endpoint,
			...config
		});
	}
}
