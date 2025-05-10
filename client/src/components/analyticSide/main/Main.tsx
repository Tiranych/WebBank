import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { TClient, TClients } from 'types';

import { getClients } from '@services/getClients';

import { Container } from '@components/shared/container';
import { Spin } from '@components/shared/spin/Spin';

import { camelizeData } from '@utils/camelize';

import { Box, Inner, Section, Subtitle, Title, Wrapper } from './Main.styled';

type MainProps = {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AnalyticMain = ({ isLoading, setIsLoading }: MainProps) => {
	const [clients, setClients] = useState<TClients>([]);

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

	const clientsToProcess = clients.filter((client) => !client.processed);

	return (
		<Wrapper>
			<Section>
				<Container>
					{isLoading && <Spin isLoading={isLoading} size={'medium'} />}
					<Title>Добро пожаловать, аналитик!</Title>
					<Subtitle>
						{clients.length > 0
							? clientsToProcess.length > 0
								? 'Список необработанных клиентов'
								: 'Все клиенты обработаны'
							: 'Клиентов нет'}
					</Subtitle>
					<Inner>
						{clientsToProcess.map((client) => (
							<Link
								key={client.idClient}
								to={`/client/${client.idClient}`}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
								}}
							>
								<Box>
									<p>id: {client.idClient}</p>
									<p>
										ФИО:{' '}
										{client.lastname +
											' ' +
											client.firstname +
											' ' +
											client.patronymic}
									</p>
								</Box>
							</Link>
						))}
					</Inner>
				</Container>
			</Section>
		</Wrapper>
	);
};
