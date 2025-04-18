import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import {
	TClient,
	TClients,
	TContract,
	TContracts,
	TCredit,
	TCreditHistories,
	TCreditHistory,
	TCredits,
} from 'types';

import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Main } from '@components/main';

import { camelizeData } from '@utils/camelizeData';

import { Global, Wrapper } from './App.styled';

const App = () => {
	const [clients, setClients] = useState<TClients>([]);
	const [credits, setCredits] = useState<TCredits>([]);
	const [contracts, setContracts] = useState<TContracts>([]);
	const [creditHistories, setCreditHistories] = useState<TCreditHistories>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [clientsRes, creditsRes, contractsRes, historiesRes] = await Promise.all([
					fetch(`http://${process.env.SERVER_HOST_NAME}/api/clients`),
					fetch(`http://${process.env.SERVER_HOST_NAME}/api/credits`),
					fetch(`http://${process.env.SERVER_HOST_NAME}/api/contracts`),
					fetch(`http://${process.env.SERVER_HOST_NAME}/api/credit-histories`),
				]);

				const [clients, credits, contracts, creditHistories] = await Promise.all([
					clientsRes.json(),
					creditsRes.json(),
					contractsRes.json(),
					historiesRes.json(),
				]);

				const camelizedClients = camelizeData<TClient>(clients);
				const camelizedCredits = camelizeData<TCredit>(credits);
				const camelizedContracts = camelizeData<TContract>(contracts);
				const camelizedCreditHistories = camelizeData<TCreditHistory>(creditHistories);

				setClients(camelizedClients);
				setCredits(camelizedCredits);
				setContracts(camelizedContracts);
				setCreditHistories(camelizedCreditHistories);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<Global />
			<Wrapper>
				<Header />
				<Routes>
					<Route index element={<Main />}></Route>
					<Route
						path='/analytic'
						element={
							<Main
								clients={clients}
								credits={credits}
								contracts={contracts}
								creditHistories={creditHistories}
							/>
						}
					></Route>
				</Routes>
				<Footer />
			</Wrapper>
		</>
	);
};

export default App;
