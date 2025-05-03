export const makeScoringRequest = (data: any) => {
	try {
		return fetch('http://localhost:8000/predict', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	} catch (e: any) {
		return e.messgae;
	}
};
