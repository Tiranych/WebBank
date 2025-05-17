import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TClient, TCreditHistories, TCreditHistory } from 'types';

import { getClientsById } from '@services/getClientsById';
import { getCreditHistoryById } from '@services/getCreditHistoryById';
import { processClient } from '@services/processClient';

import { Container } from '@components/shared/container';
import { Spin } from '@components/shared/spin/Spin';

import { camelizeData } from '@utils/camelize';

import {
	Box,
	Button,
	Grid,
	Inner,
	Item,
	ListItem,
	Row,
	Section,
	StatusBlock,
	StatusText,
	Text,
	Title,
	Wrapper,
} from './ClientProfile.styled';

type MainProps = {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ClientProfile = ({ isLoading, setIsLoading }: MainProps) => {
	const { id } = useParams();
	const idNum = Number(id) || -1;
	const [client, setClient] = useState<TClient>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);

				if (id) {
					const clientRes = await getClientsById(idNum);
					const camelizedClient = camelizeData<TClient>(clientRes);
					setClient(camelizedClient[0]);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<Wrapper>
			<Section>
				<Container>
					{isLoading && <Spin isLoading={isLoading} size={'medium'} />}
					{client ? (
						<>
							<Title>Личный кабинет</Title>
							<Box>
								<Grid>
									<div>
										<Row>
											<p>ФИО:</p>
											<p>
												{client.lastname +
													' ' +
													client.firstname +
													' ' +
													client.patronymic}
											</p>
										</Row>
										<Row>
											<p>Пол:</p>
											<p>{client.gender}</p>
										</Row>
										<Row>
											<p>Дата рождения:</p>
											<p>
												{new Date(client.birthdate)
													.toLocaleDateString('ru-RU', {
														day: '2-digit',
														month: '2-digit',
														year: 'numeric',
													})
													.replace(/\//g, '.')}
											</p>
										</Row>
										<Row>
											<p>Адрес:</p>
											<p>{client.address}</p>
										</Row>
										<Row>
											<p>Место рождения:</p>
											<p>{client.birthplace}</p>
										</Row>
										<Row>
											<p>Номер телефона:</p>
											<p>
												{client.phoneNumber.slice(0, 2) +
													'(' +
													client.phoneNumber.slice(2, 5) +
													')' +
													client.phoneNumber.slice(5, 8) +
													'-' +
													client.phoneNumber.slice(8, 10) +
													'-' +
													client.phoneNumber.slice(10, 12)}
											</p>
										</Row>
										<Row>
											<p>ИНН:</p>
											<p>{client.inn}</p>
										</Row>
										<Row>
											<p>Семейное положение:</p>
											<p>{client.maritalStatus}</p>
										</Row>
										<Row>
											<p>Образование:</p>
											<p>{client.education}</p>
										</Row>
										<Row>
											<p>Занятость:</p>
											<p>{client.workstatus}</p>
										</Row>
										<Row>
											<p>Доход:</p>
											<p>{client.income + ' руб.'}</p>
										</Row>
										<Row>
											<p>Стаж работы:</p>
											<p>{client.seniority + ' мес.'}</p>
										</Row>
										<Row>
											<p>Место работы:</p>
											<p>{client.workplace}</p>
										</Row>
										<Row>
											<p>Адрес работы:</p>
											<p>{client.workaddress}</p>
										</Row>
										<Row>
											<p>Цель кредита:</p>
											<p>{client.creditConditions.purpose}</p>
										</Row>
										<Row>
											<p>Желаемая сумма:</p>
											<p>{client.creditConditions.summary + ' руб.'}</p>
										</Row>
										<Row>
											<p>Желаемый график платежей:</p>
											<p>{client.creditConditions.repaymentSchedule}</p>
										</Row>
										<Row>
											<p>Желаемый срок погашения:</p>
											<p>{client.creditConditions.period + ' мес.'}</p>
										</Row>
									</div>
									<div>
										{client.hasCars ? (
											<Row $direction={'column'}>
												<Text>Автомобили:</Text>
												{client.assetsCar.length > 0 &&
													client.assetsCar.map((car, index) => (
														<ListItem key={index}>
															{client.assetsCar.length > 1 && (
																<p>{index + 1 + '.'}</p>
															)}
															<Inner>
																<Item>
																	<p>Марка:</p>
																	<p>{car.brand}</p>
																</Item>
																<Item>
																	<p>Модель:</p>
																	<p>{car.model}</p>
																</Item>
																<Item>
																	<p>Год выпуска:</p>
																	<p>{car.year}</p>
																</Item>
																<Item>
																	<p>Текущая стоимость:</p>
																	<p>{car.price + ' руб.'}</p>
																</Item>
															</Inner>
														</ListItem>
													))}
											</Row>
										) : (
											<Row>
												<p>Нет машин</p>
											</Row>
										)}
										{client.hasEstate ? (
											<Row $direction={'column'}>
												<Text>Недвижимости:</Text>
												{client.assetsEstate.length > 0 &&
													client.assetsEstate.map((estate, index) => (
														<ListItem key={index}>
															{client.assetsEstate.length > 1 && (
																<p>{index + 1 + '.'}</p>
															)}
															<Inner>
																<Item>
																	<p>Тип:</p>
																	<p>{estate.type}</p>
																</Item>
																<Item>
																	<p>Площадь:</p>
																	<p>{estate.square + 'м²'}</p>
																</Item>
																<Item>
																	<p>Адрес:</p>
																	<p>{estate.address}</p>
																</Item>
																<Item>
																	<p>Текущая стоимость:</p>
																	<p>{estate.price + ' руб.'}</p>
																</Item>
															</Inner>
														</ListItem>
													))}
											</Row>
										) : (
											<Row>
												<p>Нет недвижимости</p>
											</Row>
										)}
									</div>
								</Grid>
							</Box>
							<Box>
								<StatusBlock>
									<StatusText>Статус по заявке:</StatusText>
									<StatusText $status={client.status}>
										{client.processed
											? client.status === 'ACCEPTED'
												? 'Заявка одобрена'
												: 'Заявка отклонена'
											: 'Заявка еще не рассмотрена'}
									</StatusText>
								</StatusBlock>
							</Box>
						</>
					) : (
						<Title>Клиент не найден</Title>
					)}
				</Container>
			</Section>
		</Wrapper>
	);
};
