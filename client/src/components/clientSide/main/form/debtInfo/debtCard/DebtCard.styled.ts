import styled from 'styled-components';

export const Wrapper = styled.div`
	margin-bottom: 50px;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const Box = styled.div`
	margin-left: auto;
`;

export const RadioInner = styled.div`
	display: flex;
	gap: 0 15px;
`;

export const Question = styled.h4`
	max-width: 300px;
`;
