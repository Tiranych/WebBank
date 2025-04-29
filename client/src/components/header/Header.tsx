import React from 'react';
import { Link } from 'react-router';

import { Container } from '@components/shared/container';

import { Img, LinkBlock, Logo, Subtitle, Title, Wrapper } from './Header.styled';

const Header = () => {
	return (
		<Wrapper>
			<Container>
				<Logo href='/'>
					<Img src='./assets/favicon.svg' alt='Logo' />
					<Title>WebBank</Title>
				</Logo>
				<Subtitle>Быстрый сервис для получения кредита!</Subtitle>
				<LinkBlock>
					<Link to={'/'}>Клиент</Link>
					<Link to={'/analytic'}>Аналитик</Link>
				</LinkBlock>
			</Container>
		</Wrapper>
	);
};

export { Header };
