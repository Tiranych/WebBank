import { Request, Response } from 'express';
import pool from '../config/db';

export async function getCreditHistories(req: Request, res: Response) {
	try {
		const result = await pool.query('SELECT * FROM credit_history');
		res.status(200).json({ credit_histories: result.rows });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function createCreditHistory(req: Request, res: Response) {
	const { rating, debtLoad } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO credit_history (rating, debt_load) VALUES ($1, $2) RETURNING *',
			[rating, debtLoad]
		);
		res.status(201).json(result.rows[0]);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

/* export async function updateCreditHistory(req: Request, res: Response) {
  const { id } = req.params;
  const { idClient, idContract } = req.body;
  try {
    const result = await pool.query(
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
		await pool.query('DELETE FROM credit_history WHERE id_credit_history = $1', [id]);
		res.status(204).send();
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
