import { FieldValues } from 'react-hook-form';

export const sendQuestionnaire = <T>(data: FieldValues, id: number) => {
	return fetch('http://localhost:3000/form', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data, id }),
	})
		.then((res) => res.json())
		.catch((e: any) => console.log(e.message)) as T;
};
