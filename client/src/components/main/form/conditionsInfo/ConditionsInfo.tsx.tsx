import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PurposeTypes, ScheduleTypes, WorkStatuses } from '@utils/constants';

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
						name='purpose'
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
											id='purpose'
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
											<option value={PurposeTypes.CONSUMER_PURPOSE} />
											<option value={PurposeTypes.CAR_PURCHASE} />
											<option value={PurposeTypes.ESTATE_PURCHASE} />
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
						name='credit_summary'
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
											id='creditSummary'
											placeholder='Сумма кредита, руб.'
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
						name='repayment_schedule'
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
											id='repaymentSchedule'
											placeholder='График погашения'
											list='scheduleType'
											onChange={(e) => {
												const cyrillicAndDigitsOnly =
													e.target.value.replace(/[^А-ЯЁа-яё 0-9]/g, '');
												field.onChange(cyrillicAndDigitsOnly);
											}}
										/>
										<datalist id='scheduleType'>
											<option value={ScheduleTypes.ANNUITIES} />
											<option value={ScheduleTypes.DIFFERENTIATED} />
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
						name='credit_period'
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
											id='creditPeriod'
											placeholder='Срок кредитования, мес.'
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
		</>
	);
};
