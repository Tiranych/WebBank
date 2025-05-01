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
	firstname: string;
	hasCars: boolean;
	hasDebts: boolean;
	hasEstate: boolean;
	income: number;
	inn: string;
	lastname: string;
	patronymic: string;
	purpose: string;
	repaymentSchedule: string;
	seniority: string;
	status: string;
	workplace: string;
};

export type TQuestionnaireResponse = {
	success: boolean;
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
