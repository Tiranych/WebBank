import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

import { useAdmin, useAuth, useIDClient } from '@contexts/index';

import { Container } from '@components/shared/container';

import { Box, Button, Img, Inner, Logo, NavInner, Subtitle, Title, Wrapper } from './Header.styled';
import { SigninModal } from './signinModal';
import { SignupModal } from './signupModal';

type HeaderProps = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	showForm: boolean;
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ showModal, setShowModal, setIsLoading, showForm, setShowForm }: HeaderProps) => {
	const [authMode, setAuthMode] = useState('');
	const idClient = useIDClient();
	const isAuth = useAuth();
	const isAdmin = useAdmin();
	const location = useLocation();
	const path = location.pathname;

	const handleSigninClick = () => {
		setShowModal(true);
		setAuthMode('signin');
	};

	const handleSignupClick = () => {
		setShowModal(true);
		setAuthMode('signup');
	};

	const handleOpenFormClick = () => {
		setShowForm(true);
	};

	const handleExitClick = () => {
		localStorage.removeItem('AUTH_TOKEN');
		window.location.reload();
	};

	return (
		<Wrapper>
			<Container>
				{showModal && authMode === 'signin' && (
					<SigninModal setShowModal={setShowModal} setIsLoading={setIsLoading} />
				)}
				{showModal && authMode === 'signup' && (
					<SignupModal setShowModal={setShowModal} setIsLoading={setIsLoading} />
				)}
				<Inner>
					<Logo href={isAdmin ? '/#/analytic' : '/'}>
						<Img src='./assets/favicon.svg' alt='Logo' />
						<Title>WebBank</Title>
					</Logo>
					{!isAuth ? (
						<NavInner>
							<Button onClick={handleSigninClick}>Войти</Button>
							<Button onClick={handleSignupClick}>Регистрация</Button>
						</NavInner>
					) : (
						<NavInner>
							{!isAdmin && !showForm && (
								<Button onClick={handleOpenFormClick}>Заполнить заявку</Button>
							)}
							{!isAdmin && path !== `/profile/${idClient}` && (
								<Box>
									<Link to={`/profile/${idClient}`}>Личный кабинет</Link>
								</Box>
							)}
							{!isAdmin && path === `/profile/${idClient}` && (
								<Box>
									<Link to={`/`}>Вернуться назад</Link>
								</Box>
							)}
							{isAdmin && path !== '/diagrams' && (
								<Box>
									<Link to={`/diagrams`}>Посмотреть диаграммы</Link>
								</Box>
							)}
							<Button onClick={handleExitClick}>Выйти</Button>
						</NavInner>
					)}
				</Inner>
				<Subtitle>Быстрый сервис для получения кредита!</Subtitle>
			</Container>
		</Wrapper>
	);
};

export { Header };
