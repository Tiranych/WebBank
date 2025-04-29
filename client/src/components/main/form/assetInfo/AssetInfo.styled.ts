import styled from 'styled-components';

export const Inner = styled.div`
	display: flex;
	gap: 50px 0;
	flex-direction: column;
`;

export const Wrapper = styled.div`
	display: flex;
	gap: 0 15px;
`;

export const TextArea = styled.textarea`
	font-size: 18px;
	padding: 5px 10px;
	border-radius: 5px;
	min-width: 400px;
	min-height: 200px;
	resize: none;
`;

export const Box = styled.div`
	margin-left: auto;
`;

export const ButtonBox = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0 10px;
`;

export const Img = styled.img`
	width: 100%;
	max-width: 32px;
	max-height: 32px;
`;
