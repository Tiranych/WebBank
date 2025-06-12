import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { TClient, TClients, TPortfolio } from 'types';

import { getClients } from '@services/getClients';
import { getCreditPortfolio } from '@services/getCreditPortfolio';

import { Container } from '@components/shared/container';
import { Spin } from '@components/shared/spin/Spin';

import { camelizeData } from '@utils/camelize';

import { Box, Inner, Section, SectionBody, Subtitle, Text, Title, Wrapper } from './Main.styled';

type MainProps = {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AnalyticMain = ({ isLoading, setIsLoading }: MainProps) => {
	const [clients, setClients] = useState<TClients>([]);
	const [portfolio, setPortfolio] = useState<TPortfolio | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const clientsRes = await getClients();
				const camelizedClients = camelizeData<TClient>(clientsRes);
				const portfolioRes = await getCreditPortfolio();
				const camelizedPortfolio = camelizeData<TPortfolio>([portfolioRes]);
				setClients(camelizedClients);
				setPortfolio(camelizedPortfolio[0]);
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
					<SectionBody>
						<div>
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
											{client.lastname +
												' ' +
												client.firstname +
												' ' +
												client.patronymic}
										</Box>
									</Link>
								))}
							</Inner>
						</div>
						<div>
							<Subtitle>Кредитный портфель</Subtitle>
							{portfolio && (
								<Inner>
									<Box $nocursor>
										<Text>{`Общий объем кредитного портфеля: ${(Number(portfolio.totalLoans) / 1000).toFixed(1)} тыс. рублей`}</Text>
									</Box>
									<Box $nocursor>
										<Text>{`Объем кредитов на транспорт в порфтеле: ${(Number(portfolio.carLoans) / 1000).toFixed(1)} тыс. рублей`}</Text>
									</Box>
									<Box $nocursor>
										<Text>{`Объем кредитов на недвижимость в порфтеле: ${(Number(portfolio.estateLoans) / 1000).toFixed(1)} тыс. рублей`}</Text>
									</Box>
									<Box $nocursor>
										<Text>{`Объем кредитов на потребительские цели в порфтеле: ${(Number(portfolio.consumerLoans) / 1000).toFixed(1)} тыс. рублей`}</Text>
									</Box>
									<Box $nocursor>
										<Text>{`Объем риска кредитного портфеля: ${portfolio.totalRisk}%`}</Text>
									</Box>
								</Inner>
							)}
						</div>
					</SectionBody>
				</Container>
			</Section>
		</Wrapper>
	);
};
