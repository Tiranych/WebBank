import db from '../config/db';
import { Request, Response } from 'express';
import { TCredit } from 'types';
import { camelizeData } from '../utils/decamelize';

const getPortfolioQuery = async () => {
	await db.query('BEGIN');

	const result = await db.query('SELECT * FROM loan_portfolio');

	await db.query('COMMIT');

	return result.rows[0];
};

export const getPortfolio = async (req: Request, res: Response) => {
	try {
		const result = await getPortfolioQuery();

		res.status(200).json(result);
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

		const result = await getPortfolioQuery();

		let { totalLoans, carLoans, estateLoans, consumerLoans, totalRisk } = camelizeData(result);

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
				((carLoans * 0.3 + estateLoans * 0.5 + consumerLoans * 0.15) / totalLoans).toFixed(
					2
				)
			) * 100;

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
