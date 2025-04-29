import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { WorkStatuses } from '@utils/constants';

import { ErrorText, Inner, Input, Row, Subtitle } from '../Form.styled';

export const EmploymentInfo = ({ step }: { step: number }) => {
	const { control } = useFormContext();

	return (
		<>
			<Subtitle>{step}. Сведения о занятости</Subtitle>
			<Row>
				<Inner>
					<Controller
						control={control}
						name='status'
						rules={{
							required: 'Выберите значение из списка',
							validate: (value) =>
								Object.values(WorkStatuses).includes(value) ||
								'Выберите значение из списка',
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											list='statusList'
											id='status'
											placeholder='Статус'
											onChange={(e) => {
												const cyrillicOnly = e.target.value.replace(
													/[^А-ЯЁа-яё ]/g,
													''
												);

												field.onChange(cyrillicOnly);
											}}
										/>
										<datalist id='statusList'>
											<option value={WorkStatuses['SELF_EMPLOYED']} />
											<option value={WorkStatuses['WORK_FOR_HIRE']} />
											<option value={WorkStatuses['IE']} />
											<option value={WorkStatuses['PRIVATE_PRACTICE']} />
											<option value={WorkStatuses['MILITARY']} />
											<option value={WorkStatuses['RETIRED']} />
											<option value={WorkStatuses['UN_EMPLOYED']} />
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
						name='income'
						rules={{
							required: 'Обязательное поле',
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='text'
											id='income'
											placeholder='Ежемесячный доход, руб.'
											onChange={(e) => {
												const onlyDigits = e.target.value
													.replace(/[^0-9]|\b0+\d+/g, '')
													.replace(/\b0+(?=\b)/g, '0');
												field.onChange(onlyDigits);
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
						name='seniority'
						rules={{
							required: 'Обязательное поле',
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='text'
											id='seniority'
											placeholder='Стаж работы, мес.'
											$shortInput
											onChange={(e) => {
												const onlyDigits = e.target.value
													.replace(/\D/g, '')
													.replace(/^0+/, '');
												field.onChange(onlyDigits);
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
						name='workplace'
						defaultValue=''
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='text'
											id='workplace'
											placeholder='Место работы (необязательно)'
											$longInput
											onChange={(e) => {
												const cyrillicAndDigitsOnly =
													e.target.value.replace(/[^А-ЯЁа-яё 0-9]/g, '');
												field.onChange(cyrillicAndDigitsOnly);
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
		</>
	);
};
