import React from 'react';
import { TClients, TContracts, TCreditHistories, TCredits } from 'types';

import { Container } from '@components/shared/container';
import { Modal } from '@components/shared/modal';

import { Section, Title, Wrapper } from './Main.styled';
import { Diagrams } from './diagrams';
import { Form } from './form';

type MainProps = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	clients?: TClients;
	credits?: TCredits;
	contracts?: TContracts;
	creditHistories?: TCreditHistories;
};

const Main = ({
	showModal,
	setShowModal,
	isLoading,
	setIsLoading,
	clients,
	credits,
	contracts,
	creditHistories,
}: MainProps) => {
	const location = window.location.pathname;

	return (
		<Wrapper>
			{location === '/' && (
				<Section>
					<Container>
						<Title>Заполните заявку для получения кредита</Title>
						<Form
							setShowModal={setShowModal}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
						{showModal && <Modal setShowModal={setShowModal} />}
					</Container>
				</Section>
			)}
			{clients && credits && contracts && creditHistories && (
				<Diagrams
					clients={clients}
					credits={credits}
					contracts={contracts}
					creditHistories={creditHistories}
				/>
			)}
		</Wrapper>
	);
};

export { Main };
