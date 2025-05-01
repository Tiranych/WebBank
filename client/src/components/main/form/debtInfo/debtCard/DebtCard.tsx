import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { ProvisionTypes } from '@utils/constants';

import { ErrorText, Input, Row } from '../../Form.styled';
import { Inner } from '../DebtInfo.styled';
import { Box, ButtonBox, Img, Subtitle, Wrapper } from './DebtCard.styled';

export const DebtCard = ({ step }: { step: number }) => {
	const { control } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'debts',
	});

	useEffect(() => {
		fields.length < 1 &&
			append({
				bankName: '',
				summary: '',
				period: '',
				percent: '',
				remain: '',
				provision: '',
			});
	}, []);

	const handleAddClick = () => {
		append({ bankName: '', summary: '', period: '', percent: '', remain: '', provision: '' });
	};

	const handleDeleteClick = (index: number) => {
		remove(index);
	};

	return (
		<div>
			<Subtitle>{step}.1 Сведения о задолженностях</Subtitle>

			{fields.map((field, index) => (
				<Wrapper key={field.id}>
					<Row>
						<Inner>
							<Controller
								control={control}
								name={`debts.${index}.bankName`}
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
													id={`bankName-${field.id}`}
													placeholder='Наименование банка'
													$longInput
													onChange={(e) => {
														const cyrillicAndDigitsOnly =
															e.target.value.replace(
																/[^А-ЯЁа-яё 0-9]/g,
																''
															);

														controllerField.onChange(
															cyrillicAndDigitsOnly
														);
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
								name={`debts.${index}.summary`}
								rules={{
									required: 'Обязательное поле',
								}}
								render={({ field: controllerField, fieldState: { error } }) => {
									return (
										<>
											<div>
												<Input
													{...controllerField}
													id={`debtSum-${field.id}`}
													placeholder='Сумма кредита, руб.'
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
								name={`debts.${index}.period`}
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
													id={`debtPeriod-${field.id}`}
													placeholder='Срок, мес.'
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
						<Inner>
							<Controller
								control={control}
								name={`debts.${index}.percent`}
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
													id={`debtPercent-${field.id}`}
													placeholder='Ставка, %'
													$shortInput
													onChange={(e) => {
														const onlyDigits = e.target.value.replace(
															/[^0-9,]/g,
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
						<Inner>
							<Controller
								control={control}
								name={`debts.${index}.remain`}
								rules={{
									required: 'Обязательное поле',
								}}
								render={({ field: controllerField, fieldState: { error } }) => {
									return (
										<>
											<div>
												<Input
													{...controllerField}
													id={`debtRemain-${field.id}`}
													placeholder='Остаток, руб.'
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
					</Row>
					<Row>
						<Inner>
							<Controller
								control={control}
								name={`debts.${index}.provision`}
								rules={{
									validate: (value) =>
										Object.values(ProvisionTypes).includes(value) ||
										'Выберите значение из списка',
								}}
								render={({ field: controllerField, fieldState: { error } }) => {
									return (
										<>
											<div>
												<Input
													{...controllerField}
													type='text'
													id={`provision-${field.id}`}
													list='provisionList'
													placeholder='Вид обеспечения'
													onChange={(e) => {
														const cyrillicOnly = e.target.value.replace(
															/[^А-ЯЁа-яё ]/g,
															''
														);

														controllerField.onChange(cyrillicOnly);
													}}
												/>
												<datalist id='provisionList'>
													{Object.values(ProvisionTypes).map(
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
