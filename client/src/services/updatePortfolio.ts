import { TCredit, TPurpose } from 'types';

export const updatePortfolio = async (creditPurpose: TPurpose, data: TCredit) => {
	try {
		return fetch(`http://${process.env.SERVER_HOST_NAME}/api/update/portfolio`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ creditPurpose, data }),
		});
	} catch (e: any) {
		console.log(e.messgae);
	}
};
