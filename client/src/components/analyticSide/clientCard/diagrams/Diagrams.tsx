import React, { useEffect, useState } from 'react';
import { TClient, TClients } from 'types';

import { getClients } from '@services/getClients';

import { Container } from '@components/shared/container';

import { camelizeData } from '@utils/camelize';

import { BorderBox, Section, Wrapper } from './Diagrams.styled';
import { AgeDiagram } from './ageDiagram';
import { IncomeDiagram } from './incomeDiagram';

type DiagramProps = {
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Diagrams = ({ setIsLoading }: DiagramProps) => {
	const [clients, setClients] = useState<TClients>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const clientsRes = await getClients();
				const camelizedClients = camelizeData<TClient>(clientsRes);
				setClients(camelizedClients);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

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
