import BaseModel from './base/BaseModel';
export default class User extends BaseModel {
	static fields = [
		{
			field: 'id',
			header: 'ID',
			hide: true
		},
		{
			field: 'email',
			header: 'Email',
			type: 'email',
			required: true
		},
		{
			field: 'role',
			header: 'Role',
			default: 'user',
			required: true,
			options: [
				{ value: 'admin', label: 'Admin' },
				{ value: 'user', label: 'User' }
			]
		},
		{
			field: 'firstname',
			header: 'First Name',
			required: true
		},
		{
			field: 'lastname',
			header: 'Last Name',
			required: true
		},
		{
			field: 'password',
			header: 'Password',
			secure: true,
			min: 6,
			required: true,
			excludeOnGrid: true
		},
		{
			field: 'password',
			header: 'Confirm Password',
			secure: true,
			excludeOnGrid: true,
			validate: 'match:password'
		},

		{
			field: 'picture',
			header: 'Picture',
			excludeOnForm: true
		}
	];
	static title = 'User';
	static subtitle = ``;
	static endpoint = '/api/users';

	constructor(config = {}) {
		super({
			fields: User.fields,
			title: User.title,
			subtitle: User.subtitle,
			endpoint: User.endpoint,
			customizeSaveData: User.customizeSaveData,
			...config
		});
	}
}
