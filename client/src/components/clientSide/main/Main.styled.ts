import styled from 'styled-components';

import { darkColor, mainBackgroundColor } from '@utils/variables';

export const Wrapper = styled.main`
	color: ${darkColor};
	background-color: ${mainBackgroundColor};
`;

export const Section = styled.section`
	display: flex;
	justify-content: center;
	padding: 30px 0;
`;

export const Inner = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px 0;
`;

export const Title = styled.h2`
	font-size: 44px;
	line-height: 52px;
	text-align: center;
`;

export const Subtitle = styled.h3`
	font-size: 32px;
	line-height: 32px;
	text-align: center;
`;

export const Text = styled.p`
	font-size: 18px;
	line-height: 22px;
	margin: 0 40px;
`;

export const List = styled.ol`
	display: flex;
	flex-direction: column;
	gap: 15px 0;
`;

export const Item = styled.li`
	list-style-type: decimal;
	&::marker {
		font-variant-numeric: lining-nums;
	}
	margin: 0 55px;
	& > p {
		margin: 0;
	}
`;

export const DottedItem = styled.li`
	list-style-type: disc;
	&::marker {
		font-variant-numeric: lining-nums;
	}
	margin: 0 55px;
	& > p {
		margin: 0;
	}
`;
