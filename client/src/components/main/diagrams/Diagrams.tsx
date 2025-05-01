import React from 'react';
import { TClients, TContracts, TCreditHistories, TCredits } from 'types';

import { Container } from '@components/shared/container';

import { BorderBox, Section, Wrapper } from './Diagrams.styled';
import { AgeDiagram } from './ageDiagram';
import { IncomeDiagram } from './incomeDiagram';

type DiagramProps = {
	clients: any;
	credits: TCredits;
	contracts: TContracts;
	creditHistories: TCreditHistories;
};

export const Diagrams = ({ clients, credits, contracts, creditHistories }: DiagramProps) => {
	return (
		<Section>
			<Container>
				<Wrapper>
					<BorderBox>
						<AgeDiagram clients={clients} />
					</BorderBox>
					<BorderBox>
						<IncomeDiagram clients={clients} />
					</BorderBox>
				</Wrapper>
			</Container>
		</Section>
	);
};
