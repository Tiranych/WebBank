import { Request, Response } from 'express';
import db from '../config/db';

export async function getContracts(req: Request, res: Response) {
	try {
		const result = await db.query('SELECT * FROM contract');
		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function createContract(req: Request, res: Response) {
	const { totalSum, paymentPeriod, percent, startDate, status } = req.body;
	try {
		const result = await db.query(
			'INSERT INTO contract (total_sum, payment_period, payment_percent, start_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[totalSum, paymentPeriod, percent, startDate, status]
		);
		res.status(201).json(result.rows[0]);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

/* export async function updateContract(req: Request, res: Response) {
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

export async function deleteContract(req: Request, res: Response) {
	const { id } = req.params;
	try {
		await db.query('DELETE FROM contract WHERE id_contract = $1', [id]);
		res.status(204).send();
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
