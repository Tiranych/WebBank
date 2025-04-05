import React from 'react';
import { TClient } from 'types';

import { translateWord } from '@utils/translate';

import { Box, Text, Wrapper } from './Client.styled';

type ClientProps = {
	client: TClient;
};

const Client = ({ client }: ClientProps) => {
	return (
		<Wrapper>
			<Box>
				<Text>
					ФИО: {client.firstname} {client.lastname} {client.patronymic}
				</Text>
				<Text>Возраст: {client.age}</Text>
				<Text>Доход: {Math.trunc(client.income)} рублей</Text>
				<Text>
					Стаж работы:{' '}
					{client.seniority.split(' ')[0] +
						' ' +
						translateWord(client.seniority.split(' ')[1])}
				</Text>
			</Box>
		</Wrapper>
	);
};

export { Client };
