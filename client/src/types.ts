export type TClient = {
	age: number;
	firstname: string;
	idClient: number;
	idCreditHistory: number;
	income: number;
	lastname: string;
	patronymic: string;
	seniority: string;
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
