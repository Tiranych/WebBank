export const processClient = async (id: number, status?: string) => {
	try {
		return fetch(`http://${process.env.SERVER_HOST_NAME}/api/clients/${id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ idClient: id, status }),
		});
	} catch (e: any) {
		console.log(e.messgae);
	}
};
