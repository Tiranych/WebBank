import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Wrapper } from './Form.styled';
import { AssetInfo } from './assetInfo';
import { ConditionsInfo } from './conditionsInfo';
import { DebtInfo } from './debtInfo';
import { EmploymentInfo } from './employmentInfo';
import { PersonalInfo } from './personalInfo';

export const Form = () => {
	const [step, setStep] = useState(1);
	const methods = useForm({
		mode: 'all',
	});

	return (
		<FormProvider {...methods}>
			<Wrapper
				onSubmit={methods.handleSubmit((data) => {
					console.log(data);
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
