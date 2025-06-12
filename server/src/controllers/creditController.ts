import db from '../config/db';
import { Request, Response } from 'express';
import { TCredit } from 'types';

export const creditController = async (req: Request, res: Response) => {
	const data: TCredit = req.body.data;
	const id = req.body.idClient;

	try {
		if (id !== -1) {
			await db.query('BEGIN');

			await db.query(
				`INSERT INTO active_loans (id_client, credit_summary, credit_period, credit_repayment_schedule) 
		VALUES ($1, $2, $3, $4)`,
				[id, data.creditSummary, data.creditPeriod, data.creditRepaymentSchedule]
			);

			await db.query('COMMIT');

			res.status(200).json({ success: true });
		} else {
			throw new Error('Кредитная линия не создана');
		}
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
