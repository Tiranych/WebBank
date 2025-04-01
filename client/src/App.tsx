import React, { useEffect, useState } from 'react';

import Main from '@components/main/Main';

export type TClient = {
	age: number;
	firstname: string;
	id_client: number;
	id_credit_history: number;
	income: number;
	lastname: string;
	patronymic: string;
	seniority: string;
};

export type TClients = TClient[];

const App = () => {
	const [clients, setClients] = useState<TClients>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let response = await fetch(`http://${process.env.HOST_NAME}/api/clients`);

				if (response.ok) {
					setClients(await response.json());
				}
			} catch (e) {
				console.error(e);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h2>Список клиентов</h2>
			<div>
				{clients.map((client) => (
					<Main key={client.id_client} client={client}></Main>
				))}
			</div>
		</div>
	);
};

export default App;
