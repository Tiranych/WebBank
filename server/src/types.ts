type TAssetCar = {
	brand: string;
	model: string;
	price: string;
	year: string;
};

type TAssetEstate = {
	address: string;
	price: string;
	square: string;
	type: string;
};

type TDebt = {
	bankName: string;
	percent: string;
	period: string;
	provision: string;
	remain: string;
	summary: string;
};

export type TClient = {
	assetsCar: TAssetCar[];
	assetsEstate: TAssetEstate[];
	birthdate: string;
	address: string;
	education: string;
	phoneNumber: string;
	maritalStatus: string;
	gender: string;
	birthplace: string;
	creditPeriod: string;
	creditSummary: string;
	debts: TDebt[];
	firstName: string;
	hasCars: boolean;
	hasDebts: boolean;
	hasEstate: boolean;
	income: number;
	inn: string;
	lastName: string;
	patronymic: string;
	purpose: string;
	repaymentSchedule: string;
	seniority: string;
	status: string;
	workplace: string;
};
