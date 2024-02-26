import BaseModel from './base/BaseModel';
export default class Domain extends BaseModel {
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
			field: 'industryId',
			header: 'Industry',
			excludeOnGrid: true,
			inputType: 'select',
			lookup: 'Industry'
		},
		{
			field: 'industry',
			header: 'Industry',
			excludeOnForm: true,
		},
		{
			field: 'email',
			header: 'Email',
			required: true,
			type: 'email'
		},
		{
			field: 'active',
			header: 'Active',
			type: 'boolean',
			required: true
		}
	];
	static title = 'Domain';
	static subtitle = 'Green house gas emmiting entities';
	static endpoint = '/api/domains';
	constructor(config = {}) {
		super({
			fields: Domain.fields,
			title: Domain.title,
			subtitle: Domain.subtitle,
			endpoint: Domain.endpoint,
			...config
		});
	}
}