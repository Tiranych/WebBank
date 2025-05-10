import React from 'react';
import { TClients } from 'types';

import { Container } from '@components/shared/container';

import { BorderBox, Section, Wrapper } from './Diagrams.styled';
import { AgeDiagram } from './ageDiagram';
import { IncomeDiagram } from './incomeDiagram';

type DiagramProps = {
	clients: TClients;
};

export const Diagrams = ({ clients }: DiagramProps) => {
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
