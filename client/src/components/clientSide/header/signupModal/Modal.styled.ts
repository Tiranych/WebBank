import styled, { css } from 'styled-components';

import { darkColor, errorColor, inputBackgroundColor, mainColor } from '@utils/variables';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px 0;
	width: 500px;
	height: 300px;
	padding: 20px;
	position: absolute;
	z-index: 25;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: ${darkColor};
	background-color: ${mainColor};
`;

export const Inner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px 0;
`;

export const ButtonBox = styled.div`
	display: flex;
	justify-content: flex-end;
`;

export const Img = styled.img`
	width: 100%;
	max-width: 32px;
	max-height: 32px;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const InputWrapper = styled.div`
	width: 285px;
	position: relative;
	margin-bottom: 20px;
`;

export const Input = styled.input`
	font-size: 20px;
	width: 100%;
	padding: 5px 10px;
	border-radius: 5px;
	color: ${darkColor};
	background-color: ${inputBackgroundColor};
	transition:
		color 0.2s,
		background-color 0.2s;
	&::placeholder {
		font-size: 16px;
	}
	&:last-child {
		margin-bottom: 0;
	}
`;

export const ShowIcon = styled.span`
	cursor: pointer;
	display: block;
	width: 20px;
	height: 20px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 5px;
	background-image: url('./assets/eye.svg');
	z-index: 50;
`;

export const ErrorText = styled.div<{ $enabled: boolean }>`
	position: absolute;
	font-size: 14px;
	color: ${errorColor};
	transition: opacity 0.5s;
	opacity: 0;
	max-width: 290px;
	padding: 3px 0;
	${({ $enabled }) => $enabled && `opacity: 1;`};
`;

export const Button = styled.button<{ $disabled?: boolean }>`
	font-size: 20px;
	border-radius: 10px;
	background-color: ${inputBackgroundColor};
	padding: 10px;
	margin-top: 10px;
	${({ $disabled }) => $disabled && `pointer-events: none; opacity: 0.2;`};
`;
