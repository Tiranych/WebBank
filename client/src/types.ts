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
	idCreditHistory: number;
	idClient: number;
	bankName: string;
	creditPercent: number;
	creditProvision: string;
	startDate: string;
	endDate: string;
	creditPeriod: string;
	creditRemain: number;
	creditSummary: number;
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
	idClient: number;
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
	processed: boolean;
	status: 'ACCEPTED' | 'REJECTED';
};

export type DecisionOptions = {
	ACCEPTED: 'Одобрено';
	REJECTED: 'Отказ';
};

export type TScoringRequest = {
	region: number;
	age: number;
	income: number;
	debt_summary: number;
	debt_remain: number;
	period_total: number;
	period_to_pay: number;
	has_cars: number;
	has_debts: number;
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

export type TScoringResponse = {
	idClient: number;
	decision: DecisionOptions['ACCEPTED'] | DecisionOptions['REJECTED'];
	riskScore: number;
};

export type TQuestionnaireResponse = {
	success: boolean;
	error?: string;
};

export type TAuthResponse = {
	idClient: number;
	success: boolean;
	authToken: string;
	error: string;
};

export type TClients = TClient[];
export type TCreditHistories = TCreditHistory[];
