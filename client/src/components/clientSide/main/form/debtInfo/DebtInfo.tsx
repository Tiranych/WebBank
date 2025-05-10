import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { Subtitle } from '../Form.styled';
import { ButtonBox, CardSubtitle, Img, Inner, Wrapper } from './DebtInfo.styled';
import { DebtCard } from './debtCard';

export const DebtInfo = ({ step }: { step: number }) => {
	const { control } = useFormContext();
	const hasDebts = useWatch({ control, name: 'hasDebts' });

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'debts',
	});

	useEffect(() => {
		if (fields.length < 1 && hasDebts) {
			append({
				bankName: '',
				summary: '',
				startDate: '',
				endDate: '',
				percent: '',
				remain: '',
				provision: '',
				hasCurrentOverdueDebt: undefined,
				hasRepaidOverdueDebt: undefined,
				hasRestructuring: undefined,
			});
		}
	}, [hasDebts]);

	const handleAddClick = () => {
		append({
			bankName: '',
			summary: '',
			startDate: '',
			endDate: '',
			percent: '',
			remain: '',
			provision: '',
			hasCurrentOverdueDebt: undefined,
			hasRepaidOverdueDebt: undefined,
			hasRestructuring: undefined,
		});
	};

	const handleDeleteClick = (index: number) => {
		remove(index);
	};

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
				{hasDebts && (
					<div>
						<CardSubtitle>{step}.1 Сведения о задолженностях</CardSubtitle>

						{fields.map((field, index) => (
							<DebtCard
								key={field.id + '-' + index}
								id={field.id}
								index={index}
								fieldsCount={fields.length}
								handleDeleteClick={handleDeleteClick}
							/>
						))}

						<ButtonBox>
							<button type='button' onClick={handleAddClick}>
								<Img src='./assets/add_icon.svg' alt='Добавить' />
							</button>
						</ButtonBox>
					</div>
				)}
			</Inner>
		</>
	);
};
