import humps from 'humps';

export const camelizeData = (data: any) => {
	let res: any = {};
	Object.entries(data).forEach((entry) => {
		res[`${humps.camelize(entry[0])}`] = entry[1];
	});

	return res;
};

export const decamelizeData = (data: any) => {
	let res: any = {};
	Object.entries(data).forEach((entry) => {
		res[`${humps.decamelize(entry[0])}`] = entry[1];
	});

	return res;
};
