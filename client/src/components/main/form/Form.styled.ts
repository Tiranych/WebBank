import styled from 'styled-components';

import {
	cardBackgroundColor,
	errorColor,
	headerBackgroundColor,
	mainColor,
} from '@utils/variables';

export const Wrapper = styled.form`
	font-size: 20px;
	line-height: 24px;
	padding: 15px;
	border-radius: 10px;
	background-color: ${cardBackgroundColor};
`;

export const Box = styled.div`
	display: flex;
	justify-content: center;
	gap: 0 20px;
	margin-top: 20px;
`;

export const Button = styled.button<{ $disabled?: boolean }>`
	font-size: 20px;
	line-height: 24px;
	color: ${mainColor};
	background-color: ${headerBackgroundColor};
	padding: 10px;
	border-radius: 5px;
	${({ $disabled }) => $disabled && `pointer-events: none; opacity: 0.2;`};
	transition:
		transform 0.4s,
		box-shadow 0.4s;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0px 0px 8px ${mainColor};
	}
`;

export const Subtitle = styled.h3`
	font-size: 32px;
	padding: 15px 0 25px;
`;

export const Row = styled.div`
	display: flex;
	gap: 30px;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 30px;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const Inner = styled.div`
	display: flex;
	gap: 0 20px;
	align-items: center;
`;

export const Input = styled.input<{ $shortInput?: boolean; $longInput?: boolean }>`
	font-size: 20px;
	padding: 5px 10px;
	border-radius: 5px;
	${({ $shortInput }) => $shortInput && 'max-width: 200px;'}
	${({ $longInput }) => $longInput && 'min-width: 600px;'}
	transition: color 0.2s, background-color 0.2s;
	&::placeholder {
		font-size: 16px;
	}
`;

export const ErrorText = styled.div<{ $enabled: boolean }>`
	position: absolute;
	font-size: 14px;
	color: ${errorColor};
	transition: opacity 0.5s;
	opacity: 0;
	max-width: 290px;
	word-wrap: wrap;
	${({ $enabled }) => $enabled && `opacity: 1;`};
`;
