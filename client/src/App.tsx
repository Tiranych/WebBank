import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { TClient, TClients } from 'types';

import { ClientsContext } from '@contexts/ClientsContext';

import { getClients } from '@services/getClients';

import { ClientCard } from '@components/analyticSide/clientCard';
import { AnalyticMain } from '@components/analyticSide/main';
import { Header } from '@components/clientSide/header';
import { ClientMain } from '@components/clientSide/main';
import { NotAuthMain } from '@components/notAuth';

import { camelizeData } from '@utils/camelize';

import { Global, Overlay, Wrapper } from './App.styled';

const App = () => {
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [clients, setClients] = useState<TClients>([]);
	const [isAuth, setIsAuth] = useState(() => {
		const savedAuth = localStorage.getItem('isAuth');
		return savedAuth === 'true' ? true : false;
	});
	const [isAdmin, setIsAdmin] = useState(() => {
		const savedAuth = localStorage.getItem('isAdmin');
		return savedAuth === 'true' && isAuth ? true : false;
	});

	useEffect(() => {
		localStorage.setItem('isAuth', JSON.stringify(isAuth));
		localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
	}, [isAuth, isAdmin]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const clientsRes = await getClients();
				const camelizedClients = camelizeData<TClient>(clientsRes);
				setClients(camelizedClients);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<ClientsContext.Provider value={clients}>
				<Global />
				<Overlay $isShowOverlay={showModal || isLoading} />
				<Wrapper>
					<Header
						showModal={showModal}
						setShowModal={setShowModal}
						setIsLoading={setIsLoading}
						isAuth={isAuth}
						setIsAuth={setIsAuth}
						isAdmin={isAdmin}
						setIsAdmin={setIsAdmin}
					/>
					<Routes>
						<Route
							index
							element={
								isAuth ? (
									<ClientMain
										showModal={showModal}
										setShowModal={setShowModal}
										isLoading={isLoading}
										setIsLoading={setIsLoading}
									/>
								) : (
									<NotAuthMain />
								)
							}
						></Route>
						<Route
							path='/analytic'
							element={
								isAuth && isAdmin ? (
									<AnalyticMain isLoading={isLoading} />
								) : (
									<NotAuthMain />
								)
							}
						></Route>
						<Route
							path='/client/:id'
							element={
								isAuth && isAdmin ? (
									<ClientCard isLoading={isLoading} setIsLoading={setIsLoading} />
								) : (
									<NotAuthMain />
								)
							}
						></Route>
					</Routes>
				</Wrapper>
			</ClientsContext.Provider>
		</>
	);
};

export default App;
