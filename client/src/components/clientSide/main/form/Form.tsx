import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TQuestionnaireResponse } from 'types';

import { sendQuestionnaire } from '@services/sendQuestionnaire';

import { Spin } from '@components/shared/spin/Spin';

import { Box, Button, Wrapper } from './Form.styled';
import { AssetInfo } from './assetInfo';
import { ConditionsInfo } from './conditionsInfo';
import { DebtInfo } from './debtInfo';
import { EmploymentInfo } from './employmentInfo';
import { PersonalInfo } from './personalInfo';

export const Form = ({
	isLoading,
	setIsLoading,
	setShowModal,
}: {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [step, setStep] = useState(1);

	const methods = useForm({
		mode: 'all',
	});

	return (
		<FormProvider {...methods}>
			{isLoading && <Spin isLoading={isLoading} size={'medium'} />}
			<Wrapper
				onSubmit={methods.handleSubmit(async (data) => {
					/* console.log(data); */
					try {
						setIsLoading(true);
						const response = await sendQuestionnaire<TQuestionnaireResponse>(data);
						if (response.success) {
							setShowModal(true);
						}
					} catch (e) {
						console.log(e);
					} finally {
						setIsLoading(false);
					}
				})}
			>
				{step === 1 && <PersonalInfo step={step} />}
				{step === 2 && <EmploymentInfo step={step} />}
				{step === 3 && <AssetInfo step={step} />}
				{step === 4 && <DebtInfo step={step} />}
				{step === 5 && <ConditionsInfo step={step} />}
				<Box>
					<Button
						type='button'
						onClick={() => {
							setStep((prev) => prev - 1);
						}}
						$disabled={step === 1 || (step !== 1 && !methods.formState.isValid)}
					>
						Назад
					</Button>
					<Button
						type='button'
						onClick={() => {
							setStep((prev) => prev + 1);
						}}
						$disabled={step === 5 || (step !== 5 && !methods.formState.isValid)}
					>
						Далее
					</Button>
					<Button type='submit' $disabled={step !== 5 || !methods.formState.isValid}>
						Отправить заявку
					</Button>
				</Box>
			</Wrapper>
		</FormProvider>
	);
};
