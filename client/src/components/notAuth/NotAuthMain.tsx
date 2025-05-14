import React, { useEffect } from 'react';
import { Link } from 'react-router';

import { useAdmin, useAuth } from '@contexts/index';

import { Container } from '@components/shared/container';

import { Button, Section, Title, Wrapper } from './NotAuthMain.styled';

export const NotAuthMain = ({ text }: { text: string }) => {
	const isAuth = useAuth();
	const isAdmin = useAdmin();

	return (
		<Wrapper>
			<Section>
				<Container>
					<Title>{text}</Title>
					{isAuth && !isAdmin && (
						<Button>
							<Link to={'/'}>Вернуться на главную страницу</Link>
						</Button>
					)}
				</Container>
			</Section>
		</Wrapper>
	);
};
