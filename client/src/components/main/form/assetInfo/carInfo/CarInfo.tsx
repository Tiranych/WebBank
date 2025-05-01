import React, { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ButtonBox, Img } from '../AssetInfo.styled';
import { Subtitle } from './CarInfo.styled';
import { AutoCard } from './autoCard';
import { TCars } from './types';

export const CarInfo = ({ step }: { step: number }) => {
	const { control } = useFormContext();
	const [cars, setCars] = useState<TCars>([]);

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'assetsCar',
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`https://cars-base.ru/api/cars?full=1`);

				setCars(await response.json());
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (fields.length < 1) append({ brand: '', model: '', year: '', price: '' });
	}, []);

	const handleAddClick = () => {
		append({ brand: '', model: '', year: '', price: '' });
	};

	const handleDeleteClick = (index: number) => {
		remove(index);
	};

	return (
		<div>
			<Subtitle>{step}.1 Сведения об автомобилях</Subtitle>

			{fields.map((field, index) => (
				<AutoCard
					key={field.id + '-' + index}
					id={field.id}
					index={index}
					fieldsCount={fields.length}
					cars={cars}
					handleDeleteClick={handleDeleteClick}
				/>
			))}

			<ButtonBox>
				<button type='button' onClick={handleAddClick}>
					<Img src='./assets/add_icon.svg' alt='Добавить' />
				</button>
			</ButtonBox>
		</div>
	);
};
