import { Request, Response } from 'express';
import { TClient } from 'types';
import { decamelizeData } from '../utils/decamelize';
import db from '../config/db';

export const handleFormController = async (req: Request, res: Response) => {
	const data: TClient = req.body;
	try {
		const result = await db
			.query(
				`INSERT INTO client (lastname, firstname, patronymic, gender, address, 
				phone_number, birthdate, birthplace, inn, marital_status, education) 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
				[
					data.lastName,
					data.firstName,
					data.patronymic,
					data.gender,
					data.address,
					data.phoneNumber,
					data.birthdate,
					data.birthplace,
					data.inn,
					data.maritalStatus,
					data.education,
				]
			)
			.then(() => {
				res.status(200).json({
					success: true,
				});
			});
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
