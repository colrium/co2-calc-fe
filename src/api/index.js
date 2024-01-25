import { Model, createServer } from 'miragejs';
import activityTypes from './activity-types.json';
import factors from './factors.json';
import types from './types.json';
/* const types = typesJson.map((item, index) => ({ ...item, id: index + 1 }));
const factors = factorsJson
	.filter((item, index) => factorsJson.findIndex((entry) => entry.name === item.name) === index)
	.map((item, index) => ({ ...item, id: index + 1 }));
const gases = Object.entries(gasesJson).map(([name, label], index) => ({ name, label, id: index + 1 }));
const units = Object.entries(unitsJson).map(([name, label], index) => ({ name, label, id: index + 1 }));*/
const server = createServer({
    models: {
        activityType: Model,
		type: Model,
        factor: Model,
        gas: Model,
        unit: Model
	},
	seeds(server) {
		for (const activityType of activityTypes) {
			server.create('activityType', activityType);
		}
        for (const factor of factors) {
			server.create('factor', factor);
        }
        /* for (const gas of gases) {
			server.create('gas', gas);
        }
        for (const unit of units) {
			server.create('unit', unit);
		} */
	},
	routes() {
		if (this.pretender) {
			const dbData = localStorage.getItem('ghg-db');
			console.log(`dbData`, dbData);
			if (dbData) {
				// https://miragejs.com/api/classes/db/#load-data
				server.db.loadData(JSON.parse(dbData));
			}
			/* this.pretender.handledRequest = (verb, path) => {
				if (verb.toLowerCase() !== 'get' && verb.toLowerCase() !== 'head') {
					// localStorage.setItem('ghg-db', JSON.stringify(server.db.dump()));
				}
			}; */
		}
		
        let nextFactorId = factors.length + 1;
        let nextActivityId = types.length + 1;
		this.get('/api/factors', (schema) => {
			return schema.factors.all();
		});
		this.get('/api/factors/:section', (schema, request) => {
			let section = request.params.section;
			return schema.factors.where((factor) => Array.isArray(factor.sections) && factor.sections.includes(section));
		});
		this.post('/api/factors', (schema, request) => {
			
			const formData = request.requestBody;

			let attrs = Object.fromEntries(
				Array.from(formData.keys()).map((key) => [
					key,
					formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)
				])
			);
			attrs.id = nextFactorId++;
			return schema.factors.create(attrs);
        });

        this.get('/api/activity-types', (schema) => {
			return schema.activityTypes.all();
		});
		this.get('/api/activity-types/:scope', (schema, request) => {
			const scope = request.params.scope;
			
			const data = schema.activityTypes.where({ scope });
			console.log('scope', scope);
			console.log('data', data);
			return data;
		});
		this.post('/api/activities', (schema, request) => {
			let attrs = JSON.parse(request.requestBody);
			attrs.id = nextActivityId++;
			return schema.activities.create(attrs);
		});
	}
});

/* 
const dbData = localStorage.getItem('db');

if (dbData) {
	// https://miragejs.com/api/classes/db/#load-data
	server.db.loadData(JSON.parse(dbData));
} */
