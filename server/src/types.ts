export type TAssetCar = {
	brand: string;
	model: string;
	price: number;
	year: number;
};

export type TAssetEstate = {
	address: string;
	price: number;
	square: number;
	type: string;
};

export type TCreditHistory = {
	bankName: string;
	percent: number;
	startDate: string;
	endDate: string;
	provision: string;
	remain: number;
	summary: number;
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
	debts: TCreditHistories;
	firstname: string;
	hasCars: boolean;
	hasDebts: boolean;
	hasEstate: boolean;
	income: number;
	inn: number;
	lastname: string;
	patronymic: string;
	seniority: number;
	workstatus: string;
	workplace: string;
	workaddress: string;
};

export type TScoringRequest = {
	age: number;
	income: number;
	debt_summary: number;
	debt_remain: number;
	period_total: number;
	period_to_pay: number;
	has_cars: number;
	car_price: number;
	has_estate: number;
	estate_price: number;
	has_current_overdue_debt: number;
	has_repaid_overdue_debt: number;
	has_restructuring: number;
	loan_purpose_encoded: number;
	potential_credit_summary: number;
	potential_credit_period: number;
};

export type DecisionOptions = {
	ACCEPTED: 'Одобрено';
	REJECTED: 'Отказ';
};

export type TScoringResponse = {
	decision: DecisionOptions['ACCEPTED'] | DecisionOptions['REJECTED'];
	risk_score: number;
};

export type TCreditHistories = TCreditHistory[];

export type TAuthRequest = {
	username: string;
	password: string;
};
