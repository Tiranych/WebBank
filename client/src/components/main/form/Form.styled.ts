import styled from 'styled-components';

import { cardBackgroundColor, headerBackgroundColor, mainColor } from '@utils/variables';

export const Wrapper = styled.form`
	font-size: 20px;
	line-height: 24px;
	padding: 15px;
	border-radius: 10px;
	background-color: ${cardBackgroundColor};
`;

export const Inner = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const Label = styled.label``;

export const Input = styled.input`
	font-size: 20px;
	padding: 5px 10px;
	border-radius: 5px;
`;

export const Box = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 20px;
`;

export const Button = styled.button`
	font-size: 20px;
	line-height: 24px;
	color: ${mainColor};
	background-color: ${headerBackgroundColor};
	padding: 10px;
	border-radius: 5px;
	transition:
		transform 0.4s,
		box-shadow 0.4s;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0px 0px 8px ${mainColor};
	}
`;
