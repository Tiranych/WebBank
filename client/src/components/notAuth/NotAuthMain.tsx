import React, { useEffect } from 'react';
import { Link } from 'react-router';

import { useAuth } from '@contexts/index';

import { Container } from '@components/shared/container';

import { Button, Section, Title, Wrapper } from './NotAuthMain.styled';

export const NotAuthMain = ({ text }: { text: string }) => {
	const isAuth = useAuth();

	return (
		<Wrapper>
			<Section>
				<Container>
					<Title>{text}</Title>
					{isAuth && (
						<Button>
							<Link to={'/'}>Вернуться на главную страницу</Link>
						</Button>
					)}
				</Container>
			</Section>
		</Wrapper>
	);
};
