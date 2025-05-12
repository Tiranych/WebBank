import styled from 'styled-components';

import { darkColor, mainColor } from '@utils/variables';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px 0;
	width: 500px;
	height: 200px;
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

export const Title = styled.h3`
	font-size: 32px;
`;

export const Subtitle = styled.h5`
	font-size: 24px;
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
