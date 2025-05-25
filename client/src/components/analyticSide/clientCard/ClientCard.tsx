import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TClient, TCreditHistories, TCreditHistory, TScoringResponse } from 'types';

import { getClientsById } from '@services/getClientsById';
import { getCreditHistoryById } from '@services/getCreditHistoryById';
import { makeScoringRequest } from '@services/makeScoringRequest';
import { processClient } from '@services/processClient';

import { Container } from '@components/shared/container';
import { Spin } from '@components/shared/spin/Spin';

import { camelizeData } from '@utils/camelize';
import { encodeCreditPurpose } from '@utils/encodeCreditPurpose';
import {
	getClientAge,
	getClientCars,
	getClientDebts,
	getClientEstates,
} from '@utils/getClientInfo';

import {
	Box,
	Button,
	Grid,
	Inner,
	Item,
	ListItem,
	Row,
	Section,
	Text,
	Title,
	Wrapper,
} from './ClientCard.styled';
import { Diagrams } from './diagrams';

type MainProps = {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ClientCard = ({ isLoading, setIsLoading }: MainProps) => {
	const { id } = useParams();
	const idNum = Number(id) || -1;
	const [isScored, setIsScored] = useState(false);
	const [showDiagram, setShowDiagram] = useState(false);
	const [client, setClient] = useState<TClient>();
	const [creditHistories, setCreditHistories] = useState<TCreditHistories>();
	const [scoringRes, setScoringRes] = useState<TScoringResponse>();

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);

				if (id) {
					const creditHistoriesRes = await getCreditHistoryById(idNum);
					const camelizedCreditHistories =
						camelizeData<TCreditHistory>(creditHistoriesRes);

					setCreditHistories(camelizedCreditHistories);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [client]);

	const scoringClick = async () => {
		try {
			setIsLoading(true);
			setIsScored(true);

			if (client) {
				let clientDebts;
				let clientCars = 0;
				let clientEstates = 0;

				if (client.hasDebts && creditHistories) {
					clientDebts = getClientDebts(creditHistories);
				}
				if (client.hasCars) {
					clientCars = getClientCars(client.assetsCar);
				}
				if (client.hasEstate) {
					clientEstates = getClientEstates(client.assetsEstate);
				}

				const scoringData = {
					region: 0, // Заглушка
					age: getClientAge(client.birthdate) || 0,
					income: client.income || 0,
					debt_summary: clientDebts?.debtSummary || 0,
					debt_remain: clientDebts?.debtRemain || 0,
					period_total: clientDebts?.periodTotal || 0,
					period_to_pay: clientDebts?.periodToPay || 0,
					has_cars: client.hasCars ? 1 : 0,
					has_debts: client.hasDebts ? 1 : 0,
					car_price: clientCars,
					has_estate: client.hasEstate ? 1 : 0,
					estate_price: clientEstates,
					has_current_overdue_debt: clientDebts?.hasCurrentOverdueDebt || 0,
					has_repaid_overdue_debt: clientDebts?.hasRepaidOverdueDebt || 0,
					has_restructuring: clientDebts?.hasRestructuring || 0,
					loan_purpose_encoded: encodeCreditPurpose(client.creditConditions.purpose),
					potential_credit_summary: client.creditConditions.summary,
					potential_credit_period: client.creditConditions.period,
				};

				const res = await makeScoringRequest(scoringData);
				const scoring_res = camelizeData<TScoringResponse>([res]);
				setScoringRes(scoring_res[0]);
			}
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const diagramClick = () => {
		setShowDiagram((prev) => !prev);
	};

	const updateClientClick = async (e: any, status: string) => {
		try {
			setIsLoading(true);
			if (id && scoringRes) {
				await processClient(idNum, status);
				window.location.assign(`http://${process.env.HOST_NAME}/analytic`);
			} else if (id) {
				await processClient(idNum);
				window.location.assign(`http://${process.env.HOST_NAME}/analytic`);
			}
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Wrapper>
			<Section>
				<Container>
					{isLoading && <Spin isLoading={isLoading} size={'medium'} />}
					{client ? (
						<>
							<Title>Карточка клиента</Title>
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
										{client.hasDebts ? (
											<Row $direction={'column'}>
												<Text>Задолженности:</Text>
												{creditHistories &&
													creditHistories.map((creditHistory, index) => (
														<ListItem
															key={creditHistory.idCreditHistory}
														>
															{creditHistories.length > 1 && (
																<p>{index + 1 + '.'}</p>
															)}
															<Inner>
																<Item>
																	<p>Наименование банка:</p>
																	<p>{creditHistory.bankName}</p>
																</Item>
																<Item>
																	<p>Ставка:</p>
																	<p>
																		{creditHistory.creditPercent +
																			'%'}
																	</p>
																</Item>
																<Item>
																	<p>Обеспечение:</p>
																	<p>
																		{
																			creditHistory.creditProvision
																		}
																	</p>
																</Item>
																<Item>
																	<p>Период выплат:</p>
																	<p>
																		{creditHistory.creditPeriod +
																			' мес.'}
																	</p>
																</Item>
																<Item>
																	<p>Сумма кредита:</p>
																	<p>
																		{creditHistory.creditSummary +
																			' руб.'}
																	</p>
																</Item>
																<Item>
																	<p>Остаток:</p>
																	<p>
																		{creditHistory.creditRemain +
																			' руб.'}
																	</p>
																</Item>
																<Item>
																	<p>
																		Текущая просроченная
																		задолженность:
																	</p>
																	<p>
																		{creditHistory.hasCurrentOverdueDebt
																			? 'есть'
																			: 'нет'}
																	</p>
																</Item>
																<Item>
																	<p>
																		Погашенная просроченная
																		задолженность:
																	</p>
																	<p>
																		{creditHistory.hasRepaidOverdueDebt
																			? 'есть'
																			: 'нет'}
																	</p>
																</Item>
																<Item>
																	<p>Реструктуризации:</p>
																	<p>
																		{creditHistory.hasRestructuring
																			? 'есть'
																			: 'нет'}
																	</p>
																</Item>
															</Inner>
														</ListItem>
													))}
											</Row>
										) : (
											<Row>
												<p>Нет долгов</p>
											</Row>
										)}
									</div>
								</Grid>
								<Row $between $nocolor>
									<div>
										<Button $margin $color={'scoring'} onClick={scoringClick}>
											Скоринг
										</Button>
										{isScored && (
											<Row $direction='column' $nopadding $center>
												<Text>
													Результаты скоринга: {scoringRes?.decision}
												</Text>
												<Text>
													Риск невыплаты кредита составляет:{' '}
													{scoringRes &&
														(scoringRes.riskScore * 100).toFixed(2) +
															'%'}
												</Text>
											</Row>
										)}
									</div>
								</Row>
								<Row $nocolor>
									<div>
										<Button $color={'scoring'} onClick={diagramClick}>
											{showDiagram ? 'Скрыть графики' : 'Посмотреть графики'}
										</Button>
									</div>
									{showDiagram && <Diagrams setIsLoading={setIsLoading} />}
								</Row>
								<Row $nocolor $center>
									<Grid>
										<Button
											$color={'accept'}
											onClick={(e) => updateClientClick(e, 'ACCEPTED')}
										>
											Одобрить
										</Button>
										<Button
											$color={'refuse'}
											onClick={(e) => updateClientClick(e, 'REJECTED')}
										>
											Отказать
										</Button>
									</Grid>
								</Row>
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
