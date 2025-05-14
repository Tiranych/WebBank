import styled from 'styled-components';

import { cardBackgroundColor, darkColor, mainBackgroundColor } from '@utils/variables';

export const Wrapper = styled.main`
	color: ${darkColor};
	background-color: ${mainBackgroundColor};
`;

export const Section = styled.section`
	display: flex;
	justify-content: center;
	padding: 30px 0;
`;

export const Title = styled.h2`
	font-size: 48px;
	text-align: center;
	line-height: 40px;
	margin-bottom: 20px;
`;

export const Button = styled.button`
	font-size: 26px;
	padding: 15px;
	border-radius: 8px;
	width: 600px;
	margin: 0 auto;
	background-color: ${cardBackgroundColor};
	transition: transform 0.4s;

	&:hover {
		transform: scale(1.05);
	}
`;
