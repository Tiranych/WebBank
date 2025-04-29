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

export const ButtonBox = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0 10px;
`;

export const Subtitle = styled.h5`
	font-size: 22px;
	padding: 10px 0 20px;
`;

export const Img = styled.img`
	width: 100%;
	max-width: 32px;
	max-height: 32px;
`;
