export const getClientsById = async (id: number) => {
	try {
		const result = await fetch(`http://${process.env.SERVER_HOST_NAME}/api/clients/${id}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}` },
		});
		return result.json();
	} catch (e: any) {
		console.log(e.message);
	}
};
