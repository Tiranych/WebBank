import styled, { createGlobalStyle, css } from 'styled-components';

import { mainBackgroundColor, mainColor } from '@utils/variables';

export const Global = createGlobalStyle`
    body, html {
        font-family: "Vollkorn", sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: ${mainColor};
        background-color: ${mainBackgroundColor};
        font-variant-numeric: lining-nums;
        scroll-behavior: smooth;
    }
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
`;

export const Overlay = styled.div<{ $isShowOverlay: boolean }>`
	width: 100%;
	height: 100%;
	${({ $isShowOverlay }) =>
		$isShowOverlay &&
		css`
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 10;
			display: block;
			overflow: auto;
		`}
`;
