import React, { useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { useParams } from 'react-router';
import { TAuthResponse, TCredit, TPurpose } from 'types';

import { useIDClient } from '@contexts/index';

import { createCreditLine } from '@services/createCreditLine';
import { signin } from '@services/signin';
import { updatePortfolio } from '@services/updatePortfolio';

import { camelizeData } from '@utils/camelize';
import { ScheduleTypes } from '@utils/constants';

import {
	Button,
	ErrorText,
	Form,
	Img,
	Inner,
	Input,
	InputWrapper,
	Title,
	TitleBox,
	Wrapper,
} from './AcceptModal.styled';

export const AcceptModal = ({
	creditPurpose,
	setShowModal,
	setIsLoading,
	updateClientClick,
}: {
	creditPurpose: TPurpose;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	updateClientClick: (status: string) => Promise<void>;
}) => {
	const [errorText, setErrorText] = useState('');
	const methods = useForm({
		mode: 'all',
	});
	const { id } = useParams();
	const idNum = Number(id) || -1;

	const { control } = methods;

	const handleCloseClick = () => {
		setShowModal(false);
	};

	return (
		<Wrapper
			onSubmit={methods.handleSubmit(async (data) => {
				try {
					setIsLoading(true);
					await updateClientClick('ACCEPTED');
					createCreditLine(idNum, data as TCredit);
					updatePortfolio(creditPurpose, data as TCredit);
				} catch (err: any) {
					console.log(err.message);
				} finally {
					setIsLoading(false);
				}
			})}
		>
			<TitleBox>
				<Title>Одобрить кредит?</Title>
				<button type='button' onClick={handleCloseClick}>
					<Img src='./assets/delete_icon.svg' alt='Закрыть' />
				</button>
			</TitleBox>
			<Inner>
				<FormProvider {...methods}>
					<Form>
						<Controller
							control={control}
							name='creditSummary'
							rules={{ required: 'Обязательное поле' }}
							render={({ field, fieldState: { error } }) => {
								return (
									<>
										<InputWrapper>
											<Input
												{...field}
												type='number'
												id='credit_sum'
												placeholder='Сумма кредита'
											/>
											<ErrorText $enabled={!!errorText || !!error}>
												{error?.message}
											</ErrorText>
										</InputWrapper>
									</>
								);
							}}
						/>
						<Controller
							control={control}
							name='creditPeriod'
							rules={{ required: 'Обязательное поле' }}
							render={({ field, fieldState: { error } }) => {
								return (
									<>
										<InputWrapper>
											<Input
												{...field}
												type='number'
												id='credit_period'
												placeholder='Срок погашения'
											/>
											<ErrorText $enabled={!!errorText || !!error}>
												{errorText ? errorText : error?.message}
											</ErrorText>
										</InputWrapper>
									</>
								);
							}}
						/>
						<Controller
							control={control}
							name='creditRepaymentSchedule'
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
														e.target.value.replace(
															/[^А-ЯЁа-яё 0-9]/g,
															''
														);
													field.onChange(cyrillicAndDigitsOnly);
												}}
											/>
											<datalist id='scheduleType'>
												{Object.values(ScheduleTypes).map((item, index) => {
													return <option key={index} value={item} />;
												})}
											</datalist>
											<ErrorText $enabled={!!error}>
												{error?.message}
											</ErrorText>
										</div>
									</>
								);
							}}
						/>
						<Button type='submit' $disabled={!methods.formState.isValid}>
							Подтвердить
						</Button>
					</Form>
				</FormProvider>
			</Inner>
		</Wrapper>
	);
};
