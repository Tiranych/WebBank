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

export const Title = styled.h2`
	font-size: 48px;
	line-height: 40px;
	margin-bottom: 10px;
`;
