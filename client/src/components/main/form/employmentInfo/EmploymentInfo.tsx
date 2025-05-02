import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { WorkStatuses } from '@utils/constants';

import { ErrorText, Inner, Input, Row, Subtitle } from '../Form.styled';
import { Wrapper } from './Employment.styled';

export const EmploymentInfo = ({ step }: { step: number }) => {
	const { control } = useFormContext();

	const workStatus = useWatch({ control, name: 'status' });

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
											{Object.values(WorkStatuses).map((item, index) => {
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
													.replace(/\D/g, '')
													.replace(/^0+(\d)/, '$1');
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
											placeholder='Общий стаж работы, мес.'
											onChange={(e) => {
												const onlyDigits = e.target.value
													.replace(/\D/g, '')
													.replace(/^0+(\d)/, '$1');
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
						disabled={
							workStatus === WorkStatuses.UN_EMPLOYED || workStatus === undefined
						}
						rules={{ required: 'Обязательное поле' }}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<Wrapper>
										<Input
											{...field}
											type='text'
											id='workplace'
											placeholder='Текущее место работы'
											$longInput
											onChange={(e) => {
												const cyrillicAndDigitsOnly =
													e.target.value.replace(/[^А-ЯЁа-яё 0-9]/g, '');
												field.onChange(cyrillicAndDigitsOnly);
											}}
										/>
										<ErrorText $enabled={!!error}>{error?.message}</ErrorText>
									</Wrapper>
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
						name='workaddress'
						disabled={
							workStatus === WorkStatuses.UN_EMPLOYED || workStatus === undefined
						}
						rules={{ required: 'Обязательное поле' }}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<Wrapper>
										<Input
											{...field}
											type='text'
											id='workaddress'
											placeholder='Адрес организации'
											$longInput
											onChange={(e) => {
												const cyrillicAndDigitsOnly =
													e.target.value.replace(/[^А-ЯЁа-яё 0-9]/g, '');
												field.onChange(cyrillicAndDigitsOnly);
											}}
										/>
										<ErrorText $enabled={!!error}>{error?.message}</ErrorText>
									</Wrapper>
								</>
							);
						}}
					/>
				</Inner>
			</Row>
		</>
	);
};
