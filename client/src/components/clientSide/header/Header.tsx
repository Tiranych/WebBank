import React, { useState } from 'react';

import { Container } from '@components/shared/container';

import { Button, Img, Inner, Logo, Subtitle, Title, Wrapper } from './Header.styled';
import { SigninModal } from './signinModal';
import { SignupModal } from './signupModal';

type HeaderProps = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	isAuth: boolean;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
	isAdmin: boolean;
	setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({
	showModal,
	setShowModal,
	setIsLoading,
	isAuth,
	setIsAuth,
	isAdmin,
	setIsAdmin,
}: HeaderProps) => {
	const [authMode, setAuthMode] = useState('');

	const handleSigninClick = () => {
		setShowModal(true);
		setAuthMode('signin');
	};

	const handleSignupClick = () => {
		setShowModal(true);
		setAuthMode('signup');
	};

	return (
		<Wrapper>
			<Container>
				{showModal && authMode === 'signin' && (
					<SigninModal
						setShowModal={setShowModal}
						setIsLoading={setIsLoading}
						setIsAuth={setIsAuth}
						setIsAdmin={setIsAdmin}
					/>
				)}
				{showModal && authMode === 'signup' && (
					<SignupModal
						setShowModal={setShowModal}
						setIsLoading={setIsLoading}
						setIsAuth={setIsAuth}
					/>
				)}
				<Inner>
					<Logo href={isAdmin ? '/analytic' : '/'}>
						<Img src='./assets/favicon.svg' alt='Logo' />
						<Title>WebBank</Title>
					</Logo>
					{!isAuth ? (
						<div>
							<Button onClick={handleSigninClick}>Войти</Button>
							<Button onClick={handleSignupClick}>Регистрация</Button>
						</div>
					) : (
						<button>Личный кабинет</button>
					)}
				</Inner>
				<Subtitle>Быстрый сервис для получения кредита!</Subtitle>
			</Container>
		</Wrapper>
	);
};

export { Header };
