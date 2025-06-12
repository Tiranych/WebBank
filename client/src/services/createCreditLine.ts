import { TCredit } from 'types';

export const createCreditLine = async (id: number, data: TCredit) => {
	try {
		return fetch(`http://${process.env.SERVER_HOST_NAME}/api/credit/create`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ idClient: id, data }),
		});
	} catch (e: any) {
		console.log(e.messgae);
	}
};
