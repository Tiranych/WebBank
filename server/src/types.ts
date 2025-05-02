type TAssetCar = {
	brand: string;
	model: string;
	price: number;
	year: number;
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
	hasCurrentOverdueDebt: boolean;
	hasRepaidOverdueDebt: boolean;
	hasRestructuring: boolean;
};

type TCreditConditions = {
	period: number;
	purpose: string;
	repaymentSchedule: string;
	summary: number;
};

export type TClient = {
	address: string;
	assetsCar: TAssetCar[];
	assetsEstate: TAssetEstate[];
	birthdate: string;
	birthplace: string;
	education: string;
	phoneNumber: string;
	maritalStatus: string;
	gender: string;
	creditConditions: TCreditConditions;
	debts: TDebt[];
	firstname: string;
	hasCars: boolean;
	hasDebts: boolean;
	hasEstate: boolean;
	income: number;
	inn: string;
	lastname: string;
	patronymic: string;
	seniority: string;
	status: string;
	workplace: string;
	workaddress: string;
};
