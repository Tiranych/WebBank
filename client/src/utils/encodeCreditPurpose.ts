export const encodeCreditPurpose = (value: string) => {
	switch (value) {
		case 'Потребительские цели':
			return 0;
		case 'Покупка транспорта':
			return 1;
		case 'Покупка недвижимости':
			return 2;
		default:
			return -1;
	}
};
