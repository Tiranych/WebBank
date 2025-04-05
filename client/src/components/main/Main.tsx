import React from 'react';
import { TClients, TContracts, TCreditHistories, TCredits } from 'types';

import { Container } from '@components/shared/container';

import { Section, Title, Wrapper } from './Main.styled';
import { Client } from './client';
import { Contract } from './contract';
import { Credit } from './credit';
import { CreditHistory } from './creditHistory';
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
			{clients && (
				<Section>
					<Container>
						{clients.map((client) => (
							<Client key={client.idClient} client={client} />
						))}
					</Container>
				</Section>
			)}
			{credits && (
				<Section>
					<Container>
						{credits.map((credit) => (
							<Credit key={credit.idCredit} credit={credit} />
						))}
					</Container>
				</Section>
			)}
			{contracts && (
				<Section>
					<Container>
						{contracts.map((contract) => (
							<Contract key={contract.idContract} contract={contract} />
						))}
					</Container>
				</Section>
			)}
			{creditHistories && (
				<Section>
					<Container>
						{creditHistories.map((creditHistory) => (
							<CreditHistory
								key={creditHistory.idCreditHistory}
								creditHistory={creditHistory}
							/>
						))}
					</Container>
				</Section>
			)}
		</Wrapper>
	);
};

export { Main };
