import { Request, Response } from 'express';

export const scoringController = async (req: Request, res: Response) => {
	try {
		const result = await fetch('http://localhost:8000/predict', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req.body),
		});

		res.status(200).json(await result.json());
	} catch (e: any) {
		console.log(e.message);
	}
};
