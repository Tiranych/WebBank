import { FieldValues } from 'react-hook-form';

export const signup = <T>(data: FieldValues) => {
	return fetch('http://localhost:3000/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.catch((e: any) => console.log(e.message)) as T;
};
