import { Request, Response } from 'express';
import db from '../config/db';
import { TClient } from 'types';
import { camelizeData } from '../utils/decamelize';
import { getMonthsBetweenDates } from '../utils/getMonthsBetweenDates';

export async function getCreditHistories(req: Request, res: Response) {
	try {
		const result = await db.query('SELECT * FROM credit_history');
		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function createCreditHistory(data: TClient) {
	const result: number[] = [];
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

		const res = await db.query(
			`INSERT INTO credit_history (bank_name, credit_percent, credit_period, 
					credit_provision, credit_remain, credit_summary, has_current_overdue_debt, has_repaid_overdue_debt, has_restructuring)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
			[
				debt.bankName,
				debt.percent,
				periodTotal,
				debt.provision,
				debt.remain,
				debt.summary,
				debt.hasCurrentOverdueDebt,
				debt.hasRepaidOverdueDebt,
				debt.hasRestructuring,
			]
		);
		result.push(camelizeData(res.rows[0]).idCreditHistory);
	}

	await db.query('COMMIT');
	return result;
}

/* export async function updateCreditHistory(req: Request, res: Response) {
  const { id } = req.params;
  const { idClient, idContract } = req.body;
  try {
    const result = await db.query(
      "UPDATE contract SET id_client = $1, id_contract = $2 WHERE id_credit = $3 RETURNING *",
      [idClient, idContract, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
} */

export async function deleteCreditHistory(req: Request, res: Response) {
	const { id } = req.params;
	try {
		await db.query('DELETE FROM credit_history WHERE id_credit_history = $1', [id]);
		res.status(204).send();
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
