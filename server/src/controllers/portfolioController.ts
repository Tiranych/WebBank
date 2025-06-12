import db from '../config/db';
import { Request, Response } from 'express';
import { TCredit } from 'types';
import { camelizeData } from '../utils/decamelize';

export const getPortfolio = async (req: Request, res: Response) => {
	try {
		await db.query('BEGIN');

		const result = await db.query('SELECT * FROM loan_portfolio');

		await db.query('COMMIT');

		res.status(200).json(result.rows[0]);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const updatePortfolio = async (req: Request, res: Response) => {
	const creditPurpose = req.body.creditPurpose;
	const data: TCredit = req.body.data;
	const creditSummary = Number(data.creditSummary);

	try {
		await db.query('BEGIN');

		const result = await db.query('SELECT * FROM loan_portfolio');

		await db.query('COMMIT');

		let { totalLoans, carLoans, estateLoans, consumerLoans, totalRisk } = camelizeData(
			result.rows[0]
		);

		if (creditPurpose === 'Потребительские цели') {
			consumerLoans = Number(consumerLoans) + creditSummary;
		} else if (creditPurpose === 'Покупка транспорта') {
			carLoans = Number(carLoans) + creditSummary;
		} else if (creditPurpose === 'Покупка недвижимости') {
			estateLoans = Number(estateLoans) + creditSummary;
		}

		totalLoans = Number(consumerLoans) + Number(carLoans) + Number(estateLoans);

		totalRisk =
			Number(
				((carLoans * 0.1 + estateLoans * 0.15 + consumerLoans * 0.05) / totalLoans).toFixed(
					2
				)
			) * 100;

		await db.query('BEGIN');

		await db.query(
			`UPDATE loan_portfolio SET total_loans = $1, car_loans = $2, estate_loans = $3, consumer_loans = $4, total_risk = $5`,
			[totalLoans, carLoans, estateLoans, consumerLoans, totalRisk]
		);

		await db.query('COMMIT');

		res.status(200).json({ success: true });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
