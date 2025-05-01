import styled, { css, keyframes } from 'styled-components';

export const SpinWrapper = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	background: transparent;
	position: absolute;
	top: 50%;
	left: 50%;
	bottom: 0;
	right: 0;
	transform: translate(-50%, -50%);
	z-index: 35;
`;

const SpinnerAnimation = keyframes`
	to {
		transform: rotate(360deg)
	}
`;

export const SpinSvg = styled.svg`
	animation: ${SpinnerAnimation} 0.85s linear infinite;
`;
