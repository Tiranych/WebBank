import { Request, Response } from 'express';
import db from '../config/db';
import { TClient } from 'types';
import { getMonthsBetweenDates } from '../utils/getMonthsBetweenDates';

export async function getCreditHistories(req: Request, res: Response) {
	try {
		await db.query('BEGIN');

		const result = await db.query('SELECT * FROM credit_history');

		await db.query('COMMIT');

		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function getCreditHistoryForClient(req: Request, res: Response) {
	let id = req.query.id;

	try {
		await db.query('BEGIN');

		const result = await db.query(`SELECT * FROM credit_history WHERE id_client = $1`, [id]);

		await db.query('COMMIT');

		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function createCreditHistory(data: TClient, idClient: number) {
	await db.query('BEGIN');

	for (const debt of data.debts) {
		const startDate = new Date(
			Number(debt.startDate.split('.')[2]),
			Number(debt.startDate.split('.')[1]) - 1,
			Number(debt.startDate.split('.')[0])
		);

		const endDate = new Date(
			Number(debt.endDate.split('.')[2]),
			Number(debt.endDate.split('.')[1]) - 1,
			Number(debt.endDate.split('.')[0])
		);

		let periodTotal = getMonthsBetweenDates(startDate, endDate);

		await db.query(
			`INSERT INTO credit_history (id_client, bank_name, credit_percent, start_date, end_date, credit_period, 
					credit_provision, credit_remain, credit_summary, has_current_overdue_debt, has_repaid_overdue_debt, has_restructuring)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
			[
				idClient,
				debt.bankName,
				debt.percent,
				startDate,
				endDate,
				periodTotal,
				debt.provision,
				debt.remain,
				debt.summary,
				debt.hasCurrentOverdueDebt,
				debt.hasRepaidOverdueDebt,
				debt.hasRestructuring,
			]
		);
	}

	await db.query('COMMIT');
}
