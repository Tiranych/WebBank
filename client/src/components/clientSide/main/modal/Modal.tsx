import React from 'react';

import { ButtonBox, Img, Inner, Subtitle, Title, Wrapper } from './Modal.styled';

export const Modal = ({
	modalText,
	setShowModal,
}: {
	modalText: string;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const handleCloseClick = () => {
		setShowModal(false);
		window.location.reload();
	};

	return (
		<Wrapper>
			<ButtonBox>
				<button type='button' onClick={handleCloseClick}>
					<Img src='./assets/delete_icon.svg' alt='Закрыть' />
				</button>
			</ButtonBox>
			<Inner>
				{modalText ? (
					<Title>{modalText}</Title>
				) : (
					<>
						<Title>Ваша заявка отправлена!</Title>
						<Subtitle>Мы её рассмотрим в ближайшее время</Subtitle>
					</>
				)}
			</Inner>
		</Wrapper>
	);
};
