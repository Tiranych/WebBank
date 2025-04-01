import { Request, Response } from 'express';
import pool from '../config/db';

export async function getClients(req: Request, res: Response) {
	try {
		const result = await pool.query('SELECT * FROM client');
		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function createClient(req: Request, res: Response) {
	const { lastName, firstName, patronymic, age, seniority, income, id_credit_history } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO client (lastname, firstname, patronymic, age, seniority, income, id_credit_history) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			[lastName, firstName, patronymic, age, seniority, income, id_credit_history]
		);
		res.status(201).json(result.rows[0]);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

/* export async function updateClient(req: Request, res: Response) {
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

export async function deleteClient(req: Request, res: Response) {
	const { id } = req.params;
	try {
		await pool.query('DELETE FROM client WHERE id_client = $1', [id]);
		res.status(204).send();
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
