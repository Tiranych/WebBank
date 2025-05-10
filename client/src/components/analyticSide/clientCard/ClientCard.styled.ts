import styled from 'styled-components';

import {
	acceptColor,
	buttonBorderColor,
	darkColor,
	grayColor,
	mainBackgroundColor,
	refuseColor,
} from '@utils/variables';

export const Wrapper = styled.main`
	color: ${darkColor};
	background-color: ${mainBackgroundColor};
`;

export const Section = styled.section`
	display: flex;
	font-size: 20px;
	flex-direction: column;
	padding: 30px 0;
`;

export const Title = styled.h2`
	font-size: 40px;
	text-align: center;
	line-height: 34px;
	margin-bottom: 20px;
`;

export const Box = styled.div`
	background-color: ${grayColor};
`;

export const Grid = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 0 20px;
`;

export const Inner = styled.ul`
	font-size: 18px;
	margin: 10px 0 20px;
`;

export const Row = styled.div<{ $direction?: string; $center?: boolean; $nopadding?: boolean }>`
	display: flex;
	gap: 0 20px;
	padding: 20px;
	${({ $direction }) => $direction === 'column' && 'flex-direction: column;'}
	${({ $center }) => $center && 'justify-content: center;'}
	${({ $nopadding }) => $nopadding && 'padding: 0px;'}
`;

export const Text = styled.p`
	margin-bottom: 10px;
	&:last-child {
		margin-bottom: 0;
	}
`;

export const Item = styled.li`
	display: flex;
	gap: 10px;
	margin-bottom: 5px;
	&:last-child {
		margin-bottom: 0;
	}
`;

export const Button = styled.button<{ $color: string }>`
	padding: 20px;
	border-radius: 5px;
	${({ $color }) => $color === 'scoring' && `background-color: ${buttonBorderColor};`}
	${({ $color }) => $color === 'accept' && `background-color: ${acceptColor};`}
	${({ $color }) => $color === 'refuse' && `background-color: ${refuseColor};`}
`;

export const NotFound = styled.p`
	text-align: center;
`;
