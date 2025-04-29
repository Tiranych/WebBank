import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Subtitle } from '../Form.styled';
import { Inner, Wrapper } from './AssetInfo.styled';
import { CarInfo } from './carInfo';
import { EstateInfo } from './estateInfo';

export const AssetInfo = ({ step }: { step: number }) => {
	const { control } = useFormContext();

	const hasCars = useWatch({ control, name: 'hasCars' });
	const hasEstate = useWatch({ control, name: 'hasEstate' });

	return (
		<>
			<Subtitle>{step}. Сведения об активах</Subtitle>
			<Inner>
				<div>
					<h4>Есть ли у Вас автомобиль?</h4>
					<Controller
						control={control}
						name='hasCars'
						rules={{
							validate: (value) => {
								return value !== undefined;
							},
						}}
						render={({ field }) => (
							<Wrapper>
								<label>
									<input
										type='radio'
										checked={field.value === true}
										onChange={() => {
											field.onChange(true);
										}}
									/>
									Да
								</label>
								<label>
									<input
										type='radio'
										checked={field.value === false}
										onChange={() => {
											field.onChange(false);
										}}
									/>
									Нет
								</label>
							</Wrapper>
						)}
					/>
				</div>
				<div>
					<h4>Есть ли у Вас недвижимость?</h4>
					<Controller
						control={control}
						name='hasEstate'
						rules={{
							validate: (value) => {
								return value !== undefined;
							},
						}}
						render={({ field }) => (
							<Wrapper>
								<label>
									<input
										type='radio'
										checked={field.value === true}
										onChange={() => {
											field.onChange(true);
										}}
									/>
									Да
								</label>
								<label>
									<input
										type='radio'
										checked={field.value === false}
										onChange={() => {
											field.onChange(false);
										}}
									/>
									Нет
								</label>
							</Wrapper>
						)}
					/>
				</div>
				{hasCars && <CarInfo step={step} />}
				{hasEstate && <EstateInfo step={step} />}
			</Inner>
		</>
	);
};
