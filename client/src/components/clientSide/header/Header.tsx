import React, { useState } from 'react';
import { Link } from 'react-router';

import { useAdmin, useAuth, useIDClient } from '@contexts/index';

import { Container } from '@components/shared/container';

import { Box, Img, Inner, Logo, NavInner, Subtitle, Title, Wrapper } from './Header.styled';
import { SigninModal } from './signinModal';
import { SignupModal } from './signupModal';

type HeaderProps = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ showModal, setShowModal, setIsLoading }: HeaderProps) => {
	const [authMode, setAuthMode] = useState('');
	const idClient = useIDClient();
	const isAuth = useAuth();
	const isAdmin = useAdmin();

	const handleSigninClick = () => {
		setShowModal(true);
		setAuthMode('signin');
	};

	const handleSignupClick = () => {
		setShowModal(true);
		setAuthMode('signup');
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
					<Logo href={isAdmin ? '/analytic' : '/'}>
						<Img src='./assets/favicon.svg' alt='Logo' />
						<Title>WebBank</Title>
					</Logo>
					{!isAuth ? (
						<NavInner>
							<Box>
								<button onClick={handleSigninClick}>Войти</button>
							</Box>
							<Box>
								<button onClick={handleSignupClick}>Регистрация</button>
							</Box>
						</NavInner>
					) : (
						<NavInner>
							{!isAdmin && (
								<Box>
									<Link to={`/profile/${idClient}`}>Личный кабинет</Link>
								</Box>
							)}
							<Box>
								<button onClick={handleExitClick}>Выйти</button>
							</Box>
						</NavInner>
					)}
				</Inner>
				<Subtitle>Быстрый сервис для получения кредита!</Subtitle>
			</Container>
		</Wrapper>
	);
};

export { Header };
