import styled, { css } from 'styled-components';

import { darkColor, mainBackgroundColor, pinkColor } from '@utils/variables';

export const Wrapper = styled.main`
	color: ${darkColor};
	background-color: ${mainBackgroundColor};
`;

export const Section = styled.section`
	display: flex;
	flex-direction: column;
	padding: 30px 0;
`;

export const SectionBody = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 90vw;
`;

export const Title = styled.h2`
	font-size: 48px;
	line-height: 40px;
	margin-bottom: 20px;
	text-align: center;
`;

export const Subtitle = styled.h4`
	font-size: 30px;
	text-align: center;
	margin-bottom: 15px;
`;

export const Text = styled.p`
	font-size: 22px;
	margin-bottom: 10px;
	&:last-child {
		margin-bottom: 0;
	}
`;

export const Inner = styled.div`
	display: inline-flex;
	flex-direction: column;
	gap: 5px 0;
	width: 100%;
`;

export const Box = styled.button<{ $nocursor?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 0 15px;
	padding: 15px;
	background-color: ${pinkColor};
	font-variant-numeric: inherit;

	${({ $nocursor }) =>
		$nocursor &&
		css`
			pointer-events: none;
			cursor: default;
		`}
`;
