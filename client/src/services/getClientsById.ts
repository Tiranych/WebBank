import { TClients } from 'types';

export const getClientsById = async (id: string) => {
	try {
		const result = await fetch(`http://${process.env.SERVER_HOST_NAME}/api/clients/${id}`);
		return result.json();
	} catch (e: any) {
		console.log(e.message);
	}
};
