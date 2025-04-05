import styled from 'styled-components';

import { footerBackgroundColor, mainBackgroundColor } from '@utils/variables';

export const Wrapper = styled.main`
	display: flex;
	justify-content: center;
	color: ${footerBackgroundColor};
	background-color: ${mainBackgroundColor};
`;

export const Section = styled.section`
	padding: 30px 0;
`;

export const Title = styled.h2`
	font-size: 32px;
	line-height: 40px;
	margin-bottom: 20px;
`;
