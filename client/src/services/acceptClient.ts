export const acceptClient = async (id: string, status: string) => {
	try {
		return fetch(`http://${process.env.SERVER_HOST_NAME}/api/clients/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ idClient: id, status }),
		});
	} catch (e: any) {
		console.log(e.messgae);
	}
};
