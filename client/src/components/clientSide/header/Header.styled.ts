import styled from 'styled-components';

import { cardBackgroundColor, headerBackgroundColor } from '@utils/variables';

export const Wrapper = styled.header`
	padding: 30px 0;
	background-color: ${headerBackgroundColor};
`;

export const Inner = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Logo = styled.a`
	display: flex;
	align-items: center;
	gap: 0 20px;
	max-width: 250px;
`;

export const Img = styled.img`
	max-width: 64px;
	max-height: 64px;
`;

export const Title = styled.h1`
	font-size: 34px;
	margin-top: 15px;
`;

export const Button = styled.button`
	font-size: 20px;
	border-radius: 10px;
	background-color: ${cardBackgroundColor};
	padding: 10px;

	& + & {
		margin-left: 20px;
	}
`;

export const Subtitle = styled.h3`
	font-size: 24px;
	line-height: 30px;
	margin-top: 15px;
`;
