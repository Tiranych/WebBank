import React from 'react';
import { Link } from 'react-router';

import { useClients } from '@contexts/ClientsContext';

import { Container } from '@components/shared/container';
import { Spin } from '@components/shared/spin/Spin';

import { Box, Inner, Section, Subtitle, Title, Wrapper } from './Main.styled';

type MainProps = {
	isLoading: boolean;
};

export const AnalyticMain = ({ isLoading }: MainProps) => {
	const clients = useClients();

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
