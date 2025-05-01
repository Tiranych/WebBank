import React, { useMemo, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { ErrorText, Inner, Input, Row } from '../../../Form.styled';
import { Box, Img } from '../../AssetInfo.styled';
import { Wrapper } from '../CarInfo.styled';
import { TCars } from '../types';

export const AutoCard = ({
	index,
	id,
	fieldsCount,
	cars,
	handleDeleteClick,
}: {
	index: number;
	id: string;
	fieldsCount: number;
	cars: TCars;
	handleDeleteClick: (index: number) => void;
}) => {
	const { control } = useFormContext();
	const brandWatcher = useWatch({ control, name: `assetsCar.${index}.brand` });
	let modelWatcher = useWatch({ control, name: `assetsCar.${index}.model` });
	const [isModelActive, setIsModelActive] = useState(false);

	const selectedCar = useMemo(() => {
		return cars.find((car) => car.name === brandWatcher);
	}, [brandWatcher]);

	const modelsForSelectedCar = useMemo(() => {
		return selectedCar?.models || [];
	}, [selectedCar]);

	const selectedModel = useMemo(() => {
		return modelsForSelectedCar?.find((model) => model.name === modelWatcher);
	}, [modelWatcher, modelsForSelectedCar]);

	return (
		<Wrapper>
			<Row>
				<Inner>
					<Controller
						control={control}
						name={`assetsCar.${index}.brand`}
						rules={{
							required: 'Обязательное поле',
							validate: (value) => {
								if (cars.find((car) => car.name === value)) {
									setIsModelActive(true);
									return true;
								}
								setIsModelActive(false);
								return 'Выберите марку из списка';
							},
						}}
						render={({ field: controllerField, fieldState: { invalid, error } }) => {
							return (
								<>
									<div>
										<Input
											{...controllerField}
											type='text'
											list={`carList-${id}`}
											id={`carBrand-${id}`}
											placeholder='Марка'
											$shortInput
											onChange={(e) => {
												controllerField.onChange(e.target.value);
											}}
										/>
										<datalist id={`carList-${id}`}>
											{cars.map((car) => {
												return <option key={car.id} value={car.name} />;
											})}
										</datalist>
										<ErrorText $enabled={!!error}>{error?.message}</ErrorText>
									</div>
								</>
							);
						}}
					/>
				</Inner>
				<Inner>
					<Controller
						control={control}
						name={`assetsCar.${index}.model`}
						rules={{
							required: 'Обязательное поле',
							validate: (value) => {
								if (modelsForSelectedCar?.find((model) => model.name === value)) {
									return true;
								}
								return 'Выберите модель из списка';
							},
						}}
						render={({ field: controllerField, fieldState: { error } }) => {
							if (!isModelActive) {
								controllerField.value = '';
							}

							return (
								<>
									<div>
										<Input
											{...controllerField}
											list={`carModels-${id}`}
											id={`carModel-${id}`}
											placeholder='Модель'
											$shortInput
											disabled={!isModelActive}
										/>
										<datalist id={`carModels-${id}`}>
											{modelsForSelectedCar?.map((model) => (
												<option key={model.id} value={model.name} />
											))}
										</datalist>
										<ErrorText $enabled={!!error}>{error?.message}</ErrorText>
									</div>
								</>
							);
						}}
					/>
				</Inner>

				<Box>
					{fieldsCount > 1 && (
						<button type='button' onClick={() => handleDeleteClick(index)}>
							<Img src='./assets/delete_icon.svg' alt='Удалить' />
						</button>
					)}
				</Box>
			</Row>

			<Row>
				<Inner>
					<Controller
						control={control}
						name={`assetsCar.${index}.year`}
						rules={{
							required: 'Обязательное поле',
							validate: (value) => {
								const yearFrom = selectedModel?.['year-from'] || 1950;
								const yearTo =
									selectedModel?.['year-to'] || new Date().getFullYear();
								if (value < yearFrom || value > yearTo) {
									return `Выберите год от ${yearFrom} до ${yearTo}`;
								}
								return true;
							},
						}}
						render={({ field: controllerField, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...controllerField}
											type='text'
											id={`carYear-${id}`}
											placeholder='Год выпуска'
											$shortInput
											onChange={(e) => {
												let value = e.target.value.replace(/[^0-9]/g, '');
												if (value.length > 4)
													value = `${value.slice(0, 4)}`;
												controllerField.onChange(value);
											}}
										/>
										<ErrorText $enabled={!!error}>{error?.message}</ErrorText>
									</div>
								</>
							);
						}}
					/>
				</Inner>
				<Inner>
					<Controller
						control={control}
						name={`assetsCar.${index}.price`}
						rules={{
							required: 'Обязательное поле',
						}}
						render={({ field: controllerField, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...controllerField}
											type='text'
											id={`carPrice-${id}`}
											placeholder='Текущая стоимость, руб.'
											onChange={(e) => {
												const onlyDigits = e.target.value.replace(
													/\D/g,
													''
												);
												controllerField.onChange(onlyDigits);
											}}
										/>
										<ErrorText $enabled={!!error}>{error?.message}</ErrorText>
									</div>
								</>
							);
						}}
					/>
				</Inner>
			</Row>
		</Wrapper>
	);
};
