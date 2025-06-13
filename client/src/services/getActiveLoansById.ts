export const getActiveLoansById = async (id: number) => {
	try {
		const result = await fetch(
			`http://${process.env.SERVER_HOST_NAME}/api/clients/active/${id}`,
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}` },
			}
		);
		return result.json();
	} catch (e: any) {
		console.log(e.message);
	}
};
