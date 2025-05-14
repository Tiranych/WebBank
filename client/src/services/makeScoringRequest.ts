import { TScoringRequest, TScoringResponse } from 'types';

export const makeScoringRequest = async (scoringData: TScoringRequest) => {
	try {
		const result = await fetch(`http://${process.env.SERVER_HOST_NAME}/api/predict`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(scoringData),
		});

		return result.json();
	} catch (e: any) {
		console.log(e.message);
	}
};
