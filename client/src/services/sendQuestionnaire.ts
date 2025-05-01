import { FieldValues } from 'react-hook-form';

export const sendQuestionnaire = <T>(data: FieldValues) => {
	return fetch('http://localhost:3000/form', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((res) => res.json()) as T;
};
