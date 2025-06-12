import styled from 'styled-components';

import { darkColor } from '@utils/variables';

export const Section = styled.section`
	color: ${darkColor};
`;

export const Wrapper = styled.div`
	padding-top: 50px;
	display: flex;
	gap: 50px;
`;

export const BorderBox = styled.div`
	border: 1px solid black;
	border-radius: 15px;
	width: 100%;
	height: 100%;
	max-width: 402px; //2px добавляется из-за свойства border
`;
