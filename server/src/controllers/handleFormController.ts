import { Request, Response } from 'express';
import { TClient } from 'types';
import { createCreditHistory } from './creditHistoryController';
import { createClient } from './clientController';

export const handleFormController = async (req: Request, res: Response) => {
	const data: TClient = req.body;
	try {
		let idClient = -1;

		idClient = await createClient(data);

		if (data.hasDebts) {
			await createCreditHistory(data, idClient);
		}

		if (idClient !== -1) {
			res.status(200).json({ success: true });
		} else {
			throw new Error('Клиент не добавлен в БД');
		}
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
