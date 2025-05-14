import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import { IDClientContext, IsAdminContext, useAuth } from '@contexts/index';

import { checkAdmin } from '@services/checkAdmin';

import { ClientCard } from '@components/analyticSide/clientCard';
import { AnalyticMain } from '@components/analyticSide/main';
import { Header } from '@components/clientSide/header';
import { ClientMain } from '@components/clientSide/main';
import { NotAuthMain } from '@components/notAuth';

import { Global, Overlay, Wrapper } from './App.styled';

const App = () => {
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdmin, setisAdmin] = useState(false);
	const isAuth = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const result = await checkAdmin();
				setisAdmin(result?.success || false);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (window.location.pathname !== '/analytic' && isAdmin) {
			window.location.assign('/analytic');
		}
	}, [isAdmin]);

	return (
		<>
			<IDClientContext.Provider value={Number(localStorage.getItem('id_client'))}>
				<IsAdminContext.Provider value={isAdmin}>
					<Global />
					<Overlay $isShowOverlay={showModal || isLoading} />
					<Wrapper>
						<Header
							showModal={showModal}
							setShowModal={setShowModal}
							setIsLoading={setIsLoading}
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
										<NotAuthMain text={'Для начала работы авторизуйтесь'} />
									)
								}
							></Route>
							<Route
								path='/profile/:id'
								element={
									isAuth ? (
										<ClientMain
											showModal={showModal}
											setShowModal={setShowModal}
											isLoading={isLoading}
											setIsLoading={setIsLoading}
										/>
									) : (
										<NotAuthMain text={'Для начала работы авторизуйтесь'} />
									)
								}
							></Route>
							<Route
								path='/analytic'
								element={
									isAuth && isAdmin ? (
										<AnalyticMain
											isLoading={isLoading}
											setIsLoading={setIsLoading}
										/>
									) : (
										<NotAuthMain text={'Страница недоступна'} />
									)
								}
							></Route>
							<Route
								path='/client/:id'
								element={
									isAuth && isAdmin ? (
										<ClientCard
											isLoading={isLoading}
											setIsLoading={setIsLoading}
										/>
									) : (
										<NotAuthMain text={'Страница недоступна'} />
									)
								}
							></Route>
						</Routes>
					</Wrapper>
				</IsAdminContext.Provider>
			</IDClientContext.Provider>
		</>
	);
};

export default App;
