import React from 'react';
import { TClients, TContracts, TCreditHistories, TCredits } from 'types';

import { Container } from '@components/shared/container';

import { Section, Title, Wrapper } from './Main.styled';
import { Diagrams } from './diagrams';
import { Form } from './form';

type MainProps = {
	clients?: TClients;
	credits?: TCredits;
	contracts?: TContracts;
	creditHistories?: TCreditHistories;
};

const Main = ({ clients, credits, contracts, creditHistories }: MainProps) => {
	const location = window.location.pathname;

	return (
		<Wrapper>
			{location === '/' && (
				<Section>
					<Container>
						<Title>Заполните заявку для получения кредита!</Title>
						<Form />
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
