import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PurposeTypes, ScheduleTypes } from '@utils/constants';

import { ErrorText, Inner, Input, Row, Subtitle } from '../Form.styled';

export const ConditionsInfo = ({ step }: { step: number }) => {
	const { control } = useFormContext();

	return (
		<>
			<Subtitle>{step}. Запрашиваемые условия кредитования</Subtitle>
			<Row>
				<Inner>
					<Controller
						control={control}
						name='creditConditions.purpose'
						rules={{
							validate: (value) =>
								Object.values(PurposeTypes).includes(value) ||
								'Выберите значение из списка',
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											list='purposeList'
											id='creditConditionsPurpose'
											placeholder='Цель кредитования'
											$longInput
											onChange={(e) => {
												const cyrillicOnly = e.target.value.replace(
													/[^А-ЯЁа-яё ]/g,
													''
												);

												field.onChange(cyrillicOnly);
											}}
										/>
										<datalist id='purposeList'>
											{Object.values(PurposeTypes).map((item, index) => {
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
						name='creditConditions.summary'
						rules={{
							required: 'Обязательное поле',
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='number'
											id='creditConditionsSummary'
											placeholder='Сумма кредита, руб.'
											onChange={(e) => {
												const onlyDigits = e.target.value
													.replace(/\D/g, '')
													.replace(/^0+/, '');
												field.onChange(Number(onlyDigits));
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
						name='creditConditions.repaymentSchedule'
						rules={{
							validate: (value) =>
								Object.values(ScheduleTypes).includes(value) ||
								'Выберите значение из списка',
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='text'
											id='creditConditionsRepaymentSchedule'
											placeholder='График погашения'
											list='scheduleType'
											onChange={(e) => {
												const cyrillicAndDigitsOnly =
													e.target.value.replace(/[^А-ЯЁа-яё 0-9]/g, '');
												field.onChange(cyrillicAndDigitsOnly);
											}}
										/>
										<datalist id='scheduleType'>
											{Object.values(ScheduleTypes).map((item, index) => {
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
						name='creditConditions.period'
						rules={{
							required: 'Обязательное поле',
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='number'
											id='creditConditionsCreditPeriod'
											placeholder='Срок кредитования, мес.'
											onChange={(e) => {
												const onlyDigits = e.target.value
													.replace(/\D/g, '')
													.replace(/^0+/, '');
												field.onChange(Number(onlyDigits));
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
