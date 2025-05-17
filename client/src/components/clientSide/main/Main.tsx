import React, { useState } from 'react';

import { Container } from '@components/shared/container';

import {
	DottedItem,
	Inner,
	Item,
	List,
	Section,
	Subtitle,
	Text,
	Title,
	Wrapper,
} from './Main.styled';
import { Form } from './form';
import { Modal } from './modal';

type MainProps = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	showForm: boolean;
};

export const ClientMain = ({
	showModal,
	setShowModal,
	isLoading,
	setIsLoading,
	showForm,
}: MainProps) => {
	const [modalText, setModalText] = useState('');

	return (
		<Wrapper>
			<Section>
				<Container>
					{showForm ? (
						<>
							<Title>Заполните заявку для получения кредита</Title>
							<Form
								setShowModal={setShowModal}
								isLoading={isLoading}
								setIsLoading={setIsLoading}
								setModalText={setModalText}
							/>
							{showModal && (
								<Modal modalText={modalText} setShowModal={setShowModal} />
							)}
						</>
					) : (
						<Inner>
							<Title>
								Узнайте решение по кредиту онлайн – быстро, удобно, прозрачно!
							</Title>
							<Text>
								Добро пожаловать в цифровой сервис WebBank. Здесь вы можете подать
								заявку на кредит, а наша система автоматически проанализирует ваши
								данные и предоставит решение в вашем личном кабинете.
							</Text>
							<Subtitle>Как это работает?</Subtitle>
							<List>
								<Item>
									<Text>
										Заполните заявку – укажите достоверные сведения о себе,
										доходах и желаемых условиях кредита.
									</Text>
								</Item>
								<Item>
									<Text>
										Автоматическая проверка – наша система оценит вашу
										платёжеспособность, используя современные алгоритмы.
									</Text>
								</Item>
								<Item>
									<Text>
										Решение в личном кабинете – результат будет доступен в вашем
										профиле в течение 5-15 минут.
									</Text>
								</Item>
							</List>
							<Subtitle>Почему стоит начать именно у нас?</Subtitle>
							<List>
								<li>
									<Text>
										✅ Мгновенный ответ – не нужно ждать звонка менеджера.
									</Text>
								</li>
								<li>
									<Text>
										✅ Прозрачность – все этапы отображаются в личном кабинете.
									</Text>
								</li>
								<li>
									<Text>
										✅ Конфиденциальность – ваши данные защищены по стандартам
										безопасности.
									</Text>
								</li>
								<li>
									<Text>
										✅ Без влияния на кредитную историю – первичная проверка не
										отражается в БКИ.
									</Text>
								</li>
							</List>
							<Subtitle>Какие данные потребуются?</Subtitle>
							<Text>Для точного расчета нам нужна следующая информация:</Text>
							<List>
								<DottedItem>
									<Text>
										Основные персональные данные (ФИО, контакты, место
										проживания и др.).
									</Text>
								</DottedItem>
								<DottedItem>
									<Text>
										Сведения о доходе (официальный/неофициальный, источник
										дохода).
									</Text>
								</DottedItem>
								<DottedItem>
									<Text>
										Сведения об имуществе (наличие недвижимости, автомобиля и
										др.).
									</Text>
								</DottedItem>
								<DottedItem>
									<Text>
										Сведения о задолженностях в других банках (если есть
										действующие кредиты).
									</Text>
								</DottedItem>
								<DottedItem>
									<Text>Желаемая сумма и срок кредита.</Text>
								</DottedItem>
							</List>
							<Text>Чем точнее данные – тем выше шанс на одобрение!</Text>
							<Subtitle>Готовы оформить кредит на лучших условиях?</Subtitle>
							<Text>
								Нажмите «Заполнить заявку» и получите ответ уже через несколько
								минут!
							</Text>
						</Inner>
					)}
				</Container>
			</Section>
		</Wrapper>
	);
};
