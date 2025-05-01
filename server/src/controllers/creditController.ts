import { Request, Response } from 'express';
import db from '../config/db';

export async function getCredits(req: Request, res: Response) {
	try {
		const result = await db.query('SELECT * FROM credit');
		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function createCredit(req: Request, res: Response) {
	const { idClient, idContract } = req.body;
	try {
		const result = await db.query(
			'INSERT INTO credit (id_client, id_contract) VALUES ($1, $2) RETURNING *',
			[idClient, idContract]
		);
		res.status(201).json(result.rows[0]);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function updateCredit(req: Request, res: Response) {
	const { id } = req.params;
	const { idClient, idContract } = req.body;
	try {
		const result = await db.query(
			'UPDATE credit SET id_client = $1, id_contract = $2 WHERE id_credit = $3 RETURNING *',
			[idClient, idContract, id]
		);
		res.status(200).json(result.rows[0]);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function deleteCredit(req: Request, res: Response) {
	const { id } = req.params;
	try {
		await db.query('DELETE FROM credit WHERE id_client = $1', [id]);
		res.status(204).send();
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
