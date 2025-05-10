import { TCreditHistory } from 'types';

export const getCreditHistoryById = async (id: string) => {
	try {
		const result = await fetch(
			`http://${process.env.SERVER_HOST_NAME}/api/credit-history?id=${id}`
		);
		return result.json();
	} catch (e: any) {
		console.log(e.message);
	}
};
