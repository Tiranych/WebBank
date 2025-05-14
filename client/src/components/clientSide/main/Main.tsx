import React, { useState } from 'react';

import { Container } from '@components/shared/container';

import { Section, Title, Wrapper } from './Main.styled';
import { Form } from './form';
import { Modal } from './modal';

type MainProps = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ClientMain = ({ showModal, setShowModal, isLoading, setIsLoading }: MainProps) => {
	const [modalText, setModalText] = useState('');

	return (
		<Wrapper>
			<Section>
				<Container>
					<Title>Заполните заявку для получения кредита</Title>
					<Form
						setShowModal={setShowModal}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						setModalText={setModalText}
					/>
					{showModal && <Modal modalText={modalText} setShowModal={setShowModal} />}
				</Container>
			</Section>
		</Wrapper>
	);
};
