import humps from 'humps';

export const camelizeData = <T>(data: T[]): T[] => {
	let res: T[] = [];
	data.forEach((item) => {
		res.push(humps.camelizeKeys(item) as T);
	});

	return res;
};
