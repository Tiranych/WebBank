import { Request, Response } from 'express';
import db from '../config/db';
import { TClient } from 'types';
import { decamelizeData, camelizeData } from '../utils/decamelize';

export async function getClients(req: Request, res: Response) {
	try {
		const result = await db.query('SELECT * FROM client');
		res.status(200).json(result.rows);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function createClient(data: TClient, idsCreditHistory: number[]) {
	let result = -1;

	await db.query('BEGIN');
	const res = await db.query(
		`INSERT INTO client (lastname, firstname, patronymic, gender, address, 
		phone_number, birthdate, birthplace, inn, marital_status, education, 
		ids_credit_history, assets_car, assets_estate, credit_conditions, has_cars, 
		has_debts, has_estate, income, seniority, status, workaddress, workplace) 
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *`,
		[
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
			idsCreditHistory,
			data.assetsCar,
			data.assetsEstate,
			decamelizeData(data.creditConditions),
			data.hasCars,
			data.hasDebts,
			data.hasEstate,
			data.income,
			data.seniority,
			data.status,
			data.workaddress,
			data.workplace,
		]
	);

	result = camelizeData(res.rows[0]).idClient;

	await db.query('COMMIT');
	return result;
}

/* export async function updateClient(req: Request, res: Response) {
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

export async function deleteClient(req: Request, res: Response) {
	const { id } = req.params;
	try {
		await db.query('DELETE FROM client WHERE id_client = $1', [id]);
		res.status(204).send();
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
