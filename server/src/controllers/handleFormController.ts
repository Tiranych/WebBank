import { Request, Response } from 'express';
import { TClient, TScoringResponse } from 'types';
import { createCreditHistory } from './creditHistoryController';
import { createClient } from './clientController';
import { makeScoringRequest } from './scoringController';
import { encodeCreditPurpose } from '../utils/encodeCreditPurpose';
import { getClientDebts } from '../utils/getClientDebts';

export const handleFormController = async (req: Request, res: Response) => {
	const data: TClient = req.body;
	try {
		let idsCreditHistory: number[] = [];
		let idClient = -1;

		if (data.hasDebts) {
			idsCreditHistory = await createCreditHistory(data);
		}
		idClient = await createClient(data, idsCreditHistory);

		const clientDebts = getClientDebts(data);

		const scoring_res: TScoringResponse = await makeScoringRequest({
			age: new Date(data.birthdate).getFullYear() || 0,
			income: data.income || 0,
			debt_summary: clientDebts.debtSummary,
			debt_remain: clientDebts.debtRemain,
			period_total: clientDebts.periodTotal,
			period_to_pay: clientDebts.periodToPay,
			has_cars: data.hasCars ? 1 : 0,
			has_estate: data.hasEstate ? 1 : 0,
			has_current_overdue_debt: clientDebts.hasCurrentOverdueDebt,
			has_repaid_overdue_debt: clientDebts.hasRepaidOverdueDebt,
			has_restructuring: clientDebts.hasRestructuring,
			loan_purpose_encoded: encodeCreditPurpose(data.creditConditions.purpose),
		});

		if (idClient !== -1) {
			res.status(200).json({ success: true, idClient, scoringRes: scoring_res });
		} else {
			throw new Error('Клиент не добавлен в БД');
		}
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
