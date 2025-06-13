import { Request, Response } from 'express';
import db from '../config/db';
import { TClient } from 'types';
import { decamelizeData } from '../utils/decamelize';

export async function getClients(req: Request, res: Response) {
	try {
		await db.query('BEGIN');

		const result = await db.query('SELECT * FROM client');

		await db.query('COMMIT');

		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function getClientsById(req: Request, res: Response) {
	const { id } = req.params;

	try {
		await db.query('BEGIN');

		const result = await db.query('SELECT * FROM client WHERE id_client = $1', [id]);

		await db.query('COMMIT');

		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function getActiveClientsById(req: Request, res: Response) {
	const { id } = req.params;

	try {
		await db.query('BEGIN');

		const result = await db.query('SELECT * FROM active_loans WHERE id_client = $1', [id]);

		await db.query('COMMIT');

		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function createClient(id: number, data: TClient) {
	try {
		await db.query('BEGIN');

		await db.query(
			`INSERT INTO client (id_client, lastname, firstname, patronymic, gender, address, 
		phone_number, birthdate, birthplace, inn, marital_status, education, assets_car, assets_estate, credit_conditions, has_cars, 
		has_debts, has_estate, income, seniority, workstatus, workaddress, workplace, processed) 
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)`,
			[
				id,
				data.lastname,
				data.firstname,
				data.patronymic,
				data.gender,
				data.address,
				data.phoneNumber,
				data.birthdate,
				data.birthplace,
				data.inn,
				data.maritalStatus,
				data.education,
				data.hasCars ? data.assetsCar : null,
				data.hasEstate ? data.assetsEstate : null,
				decamelizeData(data.creditConditions),
				data.hasCars,
				data.hasDebts,
				data.hasEstate,
				data.income,
				data.seniority,
				data.workstatus,
				data.workaddress,
				data.workplace,
				false,
			]
		);

		await db.query('COMMIT');
	} catch (err: any) {
		if (
			err.message ===
			'повторяющееся значение ключа нарушает ограничение уникальности "client_pkey"'
		) {
			{
				throw new Error('Вы уже отправляли заявку');
			}
		}
	}
}

export async function updateClient(req: Request, res: Response) {
	let { idClient, status } = req.body;

	try {
		await db.query('BEGIN');

		const result = await db.query(
			'UPDATE client SET processed = true, status = $1  WHERE id_client = $2 RETURNING *',
			[status, idClient]
		);

		await db.query('COMMIT');
		res.status(200).json(result.rows[0]);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
