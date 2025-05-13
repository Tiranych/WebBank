import React from 'react';

import { Container } from '@components/shared/container';

import { Section, Title, Wrapper } from './NotAuthMain.styled';

export const NotAuthMain = () => {
	return (
		<Wrapper>
			<Section>
				<Container>
					<Title>Для начала работы авторизуйтесь</Title>
				</Container>
			</Section>
		</Wrapper>
	);
};
