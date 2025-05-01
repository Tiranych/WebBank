import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { EstateTypes } from '@utils/constants';

import { ErrorText, Inner, Input, Row } from '../../Form.styled';
import { Box, ButtonBox, Img, TextArea } from '../AssetInfo.styled';
import { Subtitle, Wrapper } from './EstateInfo.styled';

export const EstateInfo = ({ step }: { step: number }) => {
	const { control } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'assetsEstate',
	});

	useEffect(() => {
		if (fields.length < 1) append({ type: '', square: '', address: '', price: '' });
	}, []);

	const handleAddClick = () => {
		append({ type: '', square: '', address: '', price: '' });
	};

	const handleDeleteClick = (index: number) => {
		remove(index);
	};

	return (
		<div>
			<Subtitle>{step}.2 Сведения о недвижимости</Subtitle>

			{fields.map((field, index) => (
				<Wrapper key={field.id + '-' + index}>
					<Row>
						<Inner>
							<Controller
								control={control}
								name={`assetsEstate.${index}.type`}
								rules={{
									required: 'Обязательное поле',
									validate: (value) =>
										Object.values(EstateTypes).includes(value) ||
										'Выберите значение из списка',
								}}
								render={({ field: controllerField, fieldState: { error } }) => {
									return (
										<>
											<div>
												<Input
													{...controllerField}
													type='text'
													list='estateList'
													id={`estateType-${index}`}
													placeholder='Вид'
													onChange={(e) => {
														const cyrillicOnly = e.target.value.replace(
															/[^А-ЯЁа-яё ]/g,
															''
														);

														controllerField.onChange(cyrillicOnly);
													}}
												/>
												<datalist id='estateList'>
													{Object.values(EstateTypes).map(
														(item, index) => {
															return (
																<option key={index} value={item} />
															);
														}
													)}
												</datalist>
												<ErrorText $enabled={!!error}>
													{error?.message}
												</ErrorText>
											</div>
										</>
									);
								}}
							/>
						</Inner>
						<Inner>
							<Controller
								control={control}
								name={`assetsEstate.${index}.square`}
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
													id={`estateSquare-${index}`}
													placeholder='Площадь, м²'
													$shortInput
													onChange={(e) => {
														const onlyDigits = e.target.value
															.replace(/\D/g, '')
															.replace(/^0+/, '');
														controllerField.onChange(onlyDigits);
													}}
												/>
												<ErrorText $enabled={!!error}>
													{error?.message}
												</ErrorText>
											</div>
										</>
									);
								}}
							/>
						</Inner>

						<Box>
							{fields.length > 1 && (
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
								name={`assetsEstate.${index}.address`}
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
													id={`estateAddress-${index}`}
													placeholder='Адрес'
													$longInput
													onChange={(e) => {
														const cyrillicOnly = e.target.value
															.replace(/[^А-ЯЁа-яё0-9\s\-,./]/g, '')
															.replace(/\s{2,}/g, ' ')
															.replace(/,{2,}/g, ',');

														controllerField.onChange(cyrillicOnly);
													}}
												/>
												<ErrorText $enabled={!!error}>
													{error?.message}
												</ErrorText>
											</div>
										</>
									);
								}}
							/>
						</Inner>
						<Inner>
							<Controller
								control={control}
								name={`assetsEstate.${index}.price`}
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
													id={`estatePrice-${index}`}
													placeholder='Текущая стоимость, руб.'
													onChange={(e) => {
														const onlyDigits = e.target.value.replace(
															/\D/g,
															''
														);
														controllerField.onChange(onlyDigits);
													}}
												/>
												<ErrorText $enabled={!!error}>
													{error?.message}
												</ErrorText>
											</div>
										</>
									);
								}}
							/>
						</Inner>
					</Row>
				</Wrapper>
			))}

			<ButtonBox>
				<button type='button' onClick={handleAddClick}>
					<Img src='./assets/add_icon.svg' alt='Добавить' />
				</button>
			</ButtonBox>
		</div>
	);
};
