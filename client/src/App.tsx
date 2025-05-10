import React, { useState } from 'react';
import { Route, Routes } from 'react-router';

import { ClientCard } from '@components/analyticSide/clientCard';
import { AnalyticMain } from '@components/analyticSide/main';
import { Header } from '@components/clientSide/header';
import { ClientMain } from '@components/clientSide/main';

import { Global, Overlay, Wrapper } from './App.styled';

const App = () => {
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<>
			<Global />
			<Overlay $isShowOverlay={showModal || isLoading} />
			<Wrapper>
				<Header />
				<Routes>
					<Route
						index
						element={
							<ClientMain
								showModal={showModal}
								setShowModal={setShowModal}
								isLoading={isLoading}
								setIsLoading={setIsLoading}
							/>
						}
					></Route>
					<Route
						path='/analytic'
						element={<AnalyticMain isLoading={isLoading} setIsLoading={setIsLoading} />}
					></Route>
					<Route
						path='/client/:id'
						element={<ClientCard isLoading={isLoading} setIsLoading={setIsLoading} />}
					></Route>
				</Routes>
			</Wrapper>
		</>
	);
};

export default App;
