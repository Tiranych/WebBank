import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { ProvisionTypes } from '@utils/constants';

import { ErrorText, Input, Row } from '../../Form.styled';
import { Img, Inner } from '../DebtInfo.styled';
import { Box, Question, RadioInner, Wrapper } from './DebtCard.styled';

export const DebtCard = ({
	index,
	id,
	fieldsCount,
	handleDeleteClick,
}: {
	index: number;
	id: string;
	fieldsCount: number;
	handleDeleteClick: (index: number) => void;
}) => {
	const { control } = useFormContext();

	const startDate = useWatch({ control, name: `debts.${index}.startDate` });

	const validateDate = (
		dateString: string,
		day: number,
		month: number,
		year: number,
		currentYear: number
	) => {
		if (!/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19\d{2}|20\d{2})$/.test(dateString)) {
			return 'Некорректная дата';
		}

		if (year > currentYear) {
			return `Введите год до ${currentYear}`;
		}

		if (month < 1 || month > 12) {
			return 'Месяц должен быть от 01 до 12';
		}

		const daysInMonth = new Date(year, month, 0).getDate();
		if (day < 1 || day > daysInMonth) {
			return `В ${month} месяце только ${daysInMonth} дней`;
		}

		return true;
	};

	return (
		<Wrapper key={id}>
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
											id={`bankName-${id}`}
											placeholder='Наименование банка'
											$longInput
											onChange={(e) => {
												const cyrillicAndDigitsOnly =
													e.target.value.replace(/[^А-ЯЁа-яё 0-9]/g, '');
												controllerField.onChange(cyrillicAndDigitsOnly);
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
											id={`debtSum-${id}`}
											type='number'
											placeholder='Сумма кредита, руб.'
											onChange={(e) => {
												const onlyDigits = e.target.value
													.replace(/\D/g, '')
													.replace(/^0+/, '');
												controllerField.onChange(Number(onlyDigits));
											}}
										/>
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

			<Row $dateRow>
				<Inner>
					<Controller
						control={control}
						name={`debts.${index}.startDate`}
						rules={{
							required: 'Обязательное поле',
							validate: (value) => {
								const [day, month, year] = value.split('.').map(Number);

								const currentDate = new Date();
								const currentYear = currentDate.getFullYear();
								const currentMonth = currentDate.getMonth() + 1;
								const currentDay = currentDate.getDate();

								if (year === currentYear) {
									if (
										month > currentMonth ||
										(month === currentMonth && day > currentDay)
									) {
										return 'Дата не может быть в будущем';
									}
								}

								return validateDate(value, day, month, year, currentYear);
							},
						}}
						render={({ field: controllerField, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...controllerField}
											type='text'
											id={`debtStartDate-${id}`}
											placeholder='Дата получения кредита'
											onChange={(e) => {
												let value = e.target.value.replace(/[^0-9]/g, '');
												if (value.length > 2)
													value = `${value.slice(0, 2)}.${value.slice(2)}`;
												if (value.length > 5)
													value = `${value.slice(0, 5)}.${value.slice(5, 9)}`;
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
						name={`debts.${index}.endDate`}
						rules={{
							required: 'Обязательное поле',
							validate: (value) => {
								const [day, month, year] = value.split('.').map(Number);

								const currentDate = new Date();
								const currentYear = currentDate.getFullYear();

								if (
									new Date(
										startDate.split('.')[2],
										startDate.split('.')[1] - 1,
										startDate.split('.')[0]
									) > new Date(year, month - 1, day)
								) {
									return 'Дата погашения не может быть раньше даты получения';
								}

								return validateDate(value, day, month, year, currentYear);
							},
						}}
						render={({ field: controllerField, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...controllerField}
											type='text'
											id={`debtEndDate-${id}`}
											placeholder='Дата погашения кредита'
											onChange={(e) => {
												let value = e.target.value.replace(/[^0-9]/g, '');
												if (value.length > 2)
													value = `${value.slice(0, 2)}.${value.slice(2)}`;
												if (value.length > 5)
													value = `${value.slice(0, 5)}.${value.slice(5, 9)}`;
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
											type='number'
											id={`debtPercent-${id}`}
											placeholder='Ставка, %'
											$shortInput
											onChange={(e) => {
												const onlyDigits = e.target.value
													.replace(/[^0-9,]/g, '')
													.replace(/^0+(\d)/, '$1');
												controllerField.onChange(Number(onlyDigits));
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
			<Row>
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
											type='number'
											id={`debtRemain-${id}`}
											placeholder='Остаток, руб.'
											onChange={(e) => {
												const onlyDigits = e.target.value
													.replace(/\D/g, '')
													.replace(/^0+/, '');
												controllerField.onChange(Number(onlyDigits));
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
											id={`provision-${id}`}
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
											{Object.values(ProvisionTypes).map((item, index) => {
												return <option key={index} value={item} />;
											})}
										</datalist>
										<ErrorText $enabled={!!error}>{error?.message}</ErrorText>
									</div>
								</>
							);
						}}
					/>
				</Inner>
			</Row>
			<Row>
				<Inner>
					<div>
						<Question>Текущая просроченная задолженность?</Question>
						<Controller
							control={control}
							name={`debts.${index}.hasCurrentOverdueDebt`}
							rules={{
								validate: (value) => {
									return value !== undefined;
								},
							}}
							render={({ field }) => (
								<RadioInner>
									<div>
										<input
											type='radio'
											checked={field.value === true}
											onChange={() => {
												field.onChange(true);
											}}
										/>
										<label>Да</label>
									</div>
									<div>
										<input
											type='radio'
											checked={field.value === false}
											onChange={() => {
												field.onChange(false);
											}}
										/>
										<label>Нет</label>
									</div>
								</RadioInner>
							)}
						/>
					</div>
				</Inner>
				<Inner>
					<div>
						<Question>Погашенная просроченная задолженность?</Question>
						<Controller
							control={control}
							name={`debts.${index}.hasRepaidOverdueDebt`}
							rules={{
								validate: (value) => {
									return value !== undefined;
								},
							}}
							render={({ field }) => (
								<RadioInner>
									<div>
										<input
											type='radio'
											checked={field.value === true}
											onChange={() => {
												field.onChange(true);
											}}
										/>
										<label>Да</label>
									</div>
									<div>
										<input
											type='radio'
											checked={field.value === false}
											onChange={() => {
												field.onChange(false);
											}}
										/>
										<label>Нет</label>
									</div>
								</RadioInner>
							)}
						/>
					</div>
				</Inner>
				<Inner>
					<div>
						<Question>Наличие реструктуризаций?</Question>
						<Controller
							control={control}
							name={`debts.${index}.hasRestructuring`}
							rules={{
								validate: (value) => {
									return value !== undefined;
								},
							}}
							render={({ field }) => (
								<RadioInner>
									<div>
										<input
											type='radio'
											checked={field.value === true}
											onChange={() => {
												field.onChange(true);
											}}
										/>
										<label>Да</label>
									</div>
									<div>
										<input
											type='radio'
											checked={field.value === false}
											onChange={() => {
												field.onChange(false);
											}}
										/>
										<label>Нет</label>
									</div>
								</RadioInner>
							)}
						/>
					</div>
				</Inner>
			</Row>
		</Wrapper>
	);
};
