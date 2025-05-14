import React from 'react';

import { useClients } from '@contexts/index';

import { Container } from '@components/shared/container';

import { BorderBox, Section, Wrapper } from './Diagrams.styled';
import { AgeDiagram } from './ageDiagram';
import { IncomeDiagram } from './incomeDiagram';

export const Diagrams = () => {
	const clients = useClients();

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
