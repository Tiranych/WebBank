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
	startDate: string;
	endDate: string;
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

export type TScoringResponse = {
	decision: 'Одобрено' | 'Отказ (высокий риск)';
	risk_score: number;
};

export type TQuestionnaireResponse = {
	success: boolean;
	idClient: number;
	scoringRes: TScoringResponse;
};

export type TCredit = {
	idCredit: number;
	idClient: number;
	idContract: number;
};

export type TContract = {
	idContract: number;
	totalSum: string;
	paymentPeriod: number;
	paymentPercent: number;
	startDate: string;
	status: string;
};

export type TCreditHistory = {
	idCreditHistory: number;
	rating: number;
	debtLoad: number;
};

export type TClients = TClient[];
export type TCredits = TCredit[];
export type TContracts = TContract[];
export type TCreditHistories = TCreditHistory[];
