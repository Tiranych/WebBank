import React from 'react';

import { Container } from '@components/shared/container';
import { Modal } from '@components/shared/modal';

import { Section, Title, Wrapper } from './Main.styled';
import { Form } from './form';

type MainProps = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ClientMain = ({ showModal, setShowModal, isLoading, setIsLoading }: MainProps) => {
	return (
		<Wrapper>
			<Section>
				<Container>
					<Title>Заполните заявку для получения кредита</Title>
					<Form
						setShowModal={setShowModal}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
					{showModal && <Modal setShowModal={setShowModal} />}
				</Container>
			</Section>
		</Wrapper>
	);
};
