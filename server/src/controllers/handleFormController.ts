import { Request, Response } from 'express';
import { TClient } from 'types';
import { createCreditHistory } from './creditHistoryController';
import { createClient } from './clientController';

export const handleFormController = async (req: Request, res: Response) => {
	const data: TClient = req.body;
	try {
		let idsCreditHistory: number[] = [];
		let idClient = -1;

		if (data.hasDebts) {
			idsCreditHistory = await createCreditHistory(data);
		}
		idClient = await createClient(data, idsCreditHistory);

		if (idClient !== -1) {
			res.status(200).json({ success: true, idClient });
		} else {
			throw new Error('Клиент не добавлен в БД');
		}
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
