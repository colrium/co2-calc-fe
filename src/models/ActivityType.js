import { scopes } from '@/config';
import BaseModel from './base/BaseModel';

const scopesLabels = Object.entries(scopes).reduce((acc, [name, { label }]) => {
	acc[name] = label;
	return acc
}, {});
const scopesOptions = Object.entries(scopes).map(([value, { label }]) => ({ value, label }));

export default class ActivityType extends BaseModel {
	static fields = [
		{
			field: 'id',
			header: 'ID',
			hide: true
		},
		{
			field: 'label',
			header: 'Name',
			width: 240,
			required: true
		},
		{
			field: 'scope',
			header: 'Scope',
			required: true,
			width: 120,
			options: scopesOptions,
			valueGetter: ({ row }) => scopesLabels[row.scope]
		},
		{
			field: 'definition',
			header: 'Definition',
			multiline: true,
			minRows: 4,
			maxRows: 10
		},
		{
			field: 'example',
			header: 'Example',
			multiline: true,
			hide: true,
			minRows: 4,
			maxRows: 10
		}
	];
	static title = 'Activity Type';
	static subtitle = `tCO2e-genarative activity type`;
	static endpoint = '/api/activity-types';
	static customizeSaveData = async ({ values, activeRecord }) => {
		values.name = `${values.scope}_${values.label.toLowerCase().replace(' ', '_')}`;
		return values;
	};
	constructor(config = {}) {
		super({
			fields: ActivityType.fields,
			title: ActivityType.title,
			subtitle: ActivityType.subtitle,
			endpoint: ActivityType.endpoint,
			customizeSaveData: ActivityType.customizeSaveData,
			...config
		});
	}
}
