import styled from 'styled-components';

import {
	acceptColor,
	buttonBorderColor,
	darkColor,
	mainBackgroundColor,
	mainColor,
	pinkColor,
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
	font-size: 48px;
	text-align: center;
	line-height: 40px;
	margin-bottom: 20px;
`;

export const Box = styled.div`
	background-color: ${pinkColor};

	& + & {
		margin-top: 20px;
	}
`;

export const Grid = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 0 20px;
`;

export const ListItem = styled.div`
	margin-bottom: 10px;
	&:last-child {
		margin-bottom: 0;
	}
`;

export const Inner = styled.ul`
	font-size: 18px;
`;

export const Row = styled.div<{
	$direction?: string;
	$center?: boolean;
	$between?: boolean;
	$nopadding?: boolean;
	$nocolor?: boolean;
}>`
	display: flex;
	gap: 0 20px;
	padding: 10px;
	margin: 20px;
	background-color: #fff;
	border-radius: 7px;
	${({ $direction }) => $direction === 'column' && 'flex-direction: column;'}
	${({ $center }) => $center && 'justify-content: center;'}
	${({ $between }) => $between && 'justify-content: space-between;'}
	${({ $nopadding }) => $nopadding && 'margin: 0px;'}
	${({ $nocolor }) => $nocolor && 'background-color: inherit;'}
`;

export const Text = styled.p`
	font-size: 22px;
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

export const Button = styled.button<{ $color: string; $margin?: boolean }>`
	padding: 20px;
	border-radius: 5px;
	${({ $color }) => $color === 'scoring' && `background-color: ${buttonBorderColor};`}
	${({ $color }) => $color === 'accept' && `background-color: ${acceptColor};`}
	${({ $color }) => $color === 'refuse' && `background-color: ${refuseColor};`}
	${({ $margin }) => $margin && `margin-bottom: 10px;`}
`;

export const StatusBlock = styled.div`
	display: flex;
	gap: 0 20px;
	padding: 20px;
`;

export const StatusText = styled.p<{ $status?: string }>`
	padding: 10px;
	border-radius: 5px;
	${({ $status }) =>
		$status
			? $status === 'ACCEPTED'
				? `background-color: ${acceptColor};`
				: `background-color: ${refuseColor};`
			: `background-color: ${mainColor};`}
`;
