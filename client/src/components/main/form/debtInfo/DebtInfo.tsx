import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Subtitle } from '../Form.styled';
import { Inner, Wrapper } from './DebtInfo.styled';
import { DebtCard } from './debtCard';

export const DebtInfo = ({ step }: { step: number }) => {
	const { control } = useFormContext();

	const hasDebts = useWatch({ control, name: 'hasDebts' });

	return (
		<>
			<Subtitle>{step}. Сведения о задолженностях</Subtitle>
			<Inner>
				<div>
					<h4>Есть ли у Вас задолженности?</h4>
					<Controller
						control={control}
						name='hasDebts'
						rules={{
							validate: (value) => {
								return value !== undefined;
							},
						}}
						render={({ field }) => (
							<Wrapper>
								<label>
									<input
										type='radio'
										checked={field.value === true}
										onChange={() => {
											field.onChange(true);
										}}
									/>
									Да
								</label>
								<label>
									<input
										type='radio'
										checked={field.value === false}
										onChange={() => {
											field.onChange(false);
										}}
									/>
									Нет
								</label>
							</Wrapper>
						)}
					/>
				</div>
				{hasDebts && <DebtCard step={step} />}
			</Inner>
		</>
	);
};
