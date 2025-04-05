import styled from 'styled-components';

import { headerBackgroundColor } from '@utils/variables';

export const Wrapper = styled.header`
	padding: 40px 0;
	background-color: ${headerBackgroundColor};
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

export const Subtitle = styled.h3`
	font-size: 24px;
	line-height: 30px;
	margin-top: 15px;
`;

export const LinkBlock = styled.div`
	display: flex;
	gap: 0 20px;
	font-size: 20px;
	padding-top: 15px;
`;
