export type TModel = {
	id: number;
	name: string;
	'cyrillic-name': string;
	class: string;
	'year-from': number;
	'year-to': number;
	path: {
		'mark-id': string;
	};
};

export type TCar = {
	id: number;
	name: string;
	'cyrillic-name': string;
	popular: boolean;
	country: string;
	models: TModel[];
};

export type TCars = TCar[];
