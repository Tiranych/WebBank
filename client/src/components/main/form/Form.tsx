import React from 'react';

import { Box, Button, Inner, Input, Label, Wrapper } from './Form.styled';

export const Form = () => {
	return (
		<Wrapper action='' method='POST'>
			<Inner>
				<Label htmlFor='firstname'>Фамилия: </Label>
				<Input type='text' name='firstname' id='firstname' required />
			</Inner>
			<Inner>
				<Label htmlFor='lastname'>Имя: </Label>
				<Input type='text' name='lastname' id='lastname' required />
			</Inner>
			<Inner>
				<Label htmlFor='patronymic'>Отчество: </Label>
				<Input type='text' name='patronymic' id='patronymic' required />
			</Inner>
			<Inner>
				<Label htmlFor='age'>Возраст: </Label>
				<Input type='text' name='age' id='age' required />
			</Inner>
			<Inner>
				<Label htmlFor='income'>Доход: </Label>
				<Input type='text' name='income' id='income' required />
			</Inner>
			<Inner>
				<Label htmlFor='seniority'>Стаж работы (в годах): </Label>
				<Input type='text' name='seniority' id='seniority' required />
			</Inner>
			<Box>
				<Button type='submit'>Отправить заявку</Button>
			</Box>
		</Wrapper>
	);
};
