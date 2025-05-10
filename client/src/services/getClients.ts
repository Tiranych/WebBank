export const getClients = async () => {
	try {
		const result = await fetch(`http://${process.env.SERVER_HOST_NAME}/api/clients`);
		return result.json();
	} catch (e: any) {
		console.log(e.message);
	}
};
