import styled from 'styled-components';

export const Section = styled.section`
	padding: 30px 0;
`;

export const Wrapper = styled.div`
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
