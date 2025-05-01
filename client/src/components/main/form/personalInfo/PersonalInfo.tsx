import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { EducationTypes, MaritalStatuses } from '@utils/constants';

import { ErrorText, Inner, Input, RadioBox, Row, Subtitle } from '../Form.styled';

export const PersonalInfo = ({ step }: { step: number }) => {
	const { control } = useFormContext();

	const phoneNumber = useWatch({ control, name: 'phoneNumber' });

	const validateDate = (dateString: string) => {
		if (!/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19\d{2}|20\d{2})$/.test(dateString)) {
			return 'Формат должен быть DD.MM.YYYY (01.01.1900 - текущая дата)';
		}

		const [day, month, year] = dateString.split('.').map(Number);
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1;
		const currentDay = currentDate.getDate();
		const birthDate = new Date(year, month - 1, day);
		const adultDate = new Date(
			birthDate.getFullYear() + 18,
			birthDate.getMonth(),
			birthDate.getDate()
		);

		if (year < 1900 || year > currentYear) {
			return `Год должен быть между 1900 и ${currentYear}`;
		}

		if (month < 1 || month > 12) {
			return 'Месяц должен быть от 01 до 12';
		}

		const daysInMonth = new Date(year, month, 0).getDate();
		if (day < 1 || day > daysInMonth) {
			return `В ${month} месяце только ${daysInMonth} дней`;
		}

		if (year === currentYear) {
			if (month > currentMonth || (month === currentMonth && day > currentDay)) {
				return 'Дата не может быть в будущем';
			}
		}

		if (adultDate > currentDate) {
			return 'Вам должно исполниться 18 лет';
		}

		return true;
	};

	return (
		<>
			<Subtitle>{step}. Личная информация</Subtitle>
			<Row>
				<Inner>
					<Controller
						control={control}
						name='lastName'
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
											id='lastName'
											placeholder='Фамилия'
											onChange={(e) => {
												const cyrillicOnly = e.target.value
													.replace(/[^А-ЯЁа-яё]/g, '')
													.split(' ')
													.map(
														(word) =>
															word.charAt(0).toUpperCase() +
															word.slice(1).toLowerCase()
													)
													.join(' ');
												field.onChange(cyrillicOnly);
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
						name='firstName'
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
											id='firstName'
											placeholder='Имя'
											onChange={(e) => {
												const cyrillicOnly = e.target.value
													.replace(/[^А-ЯЁа-яё]/g, '')
													.split(' ')
													.map(
														(word) =>
															word.charAt(0).toUpperCase() +
															word.slice(1).toLowerCase()
													)
													.join(' ');
												field.onChange(cyrillicOnly);
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
						name='patronymic'
						defaultValue=''
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='text'
											id='patronymic'
											placeholder='Отчество (при наличии)'
											onChange={(e) => {
												const cyrillicOnly = e.target.value
													.replace(/[^А-ЯЁа-яё]/g, '')
													.split(' ')
													.map(
														(word) =>
															word.charAt(0).toUpperCase() +
															word.slice(1).toLowerCase()
													)
													.join(' ');
												field.onChange(cyrillicOnly);
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
						name='gender'
						rules={{
							validate: (value) => {
								return value !== undefined;
							},
						}}
						render={({ field }) => (
							<>
								<RadioBox>
									<input
										type='radio'
										checked={field.value === 'Мужской'}
										onChange={() => {
											field.onChange('Мужской');
										}}
									/>
									<label>Мужской</label>
								</RadioBox>
								<RadioBox>
									<input
										type='radio'
										checked={field.value === 'Женский'}
										onChange={() => {
											field.onChange('Женский');
										}}
									/>
									<label>Женский</label>
								</RadioBox>
							</>
						)}
					/>
				</Inner>
			</Row>
			<Row>
				<Inner>
					<Controller
						control={control}
						name='address'
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
											id='address'
											placeholder='Адрес регистрации'
											$longInput
											onChange={(e) => {
												const cyrillicOnly = e.target.value
													.replace(/[^А-ЯЁа-яё0-9\s\-,./]/g, '')
													.replace(/\s{2,}/g, ' ')
													.replace(/,{2,}/g, ',');

												controllerField.onChange(cyrillicOnly);
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
						name='phoneNumber'
						rules={{
							required: 'Обязательное поле',
							pattern: {
								value: /^[\d+]{12}$/,
								message: 'Неверный формат телефона',
							},
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='text'
											id='phoneNumber'
											placeholder='Номер телефона'
											onChange={(e) => {
												let phone = '+7';
												let digitsOnly;
												if (!(e.target.value.length < 2)) {
													digitsOnly = e.target.value
														.slice(2)
														.replace(/[^\d+]/g, '')
														.slice(0, 10);
												} else {
													digitsOnly = e.target.value.replace(
														/[^\d]/g,
														''
													);
												}
												phone += digitsOnly;
												field.onChange(phone);
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
						name='birthdate'
						rules={{
							required: 'Обязательное поле',
							validate: validateDate,
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='text'
											id='birthdate'
											placeholder='Дата рождения'
											onChange={(e) => {
												let value = e.target.value.replace(/[^0-9]/g, '');
												if (value.length > 2)
													value = `${value.slice(0, 2)}.${value.slice(2)}`;
												if (value.length > 5)
													value = `${value.slice(0, 5)}.${value.slice(5, 9)}`;
												field.onChange(value);
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
						name='birthplace'
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
											id='birthplace'
											placeholder='Место рождения'
											onChange={(e) => {
												const cyrillicOnly = e.target.value.replace(
													/[^А-ЯЁа-яё,. ]/g,
													''
												);
												field.onChange(cyrillicOnly);
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
						name='inn'
						rules={{
							required: 'Обязательное поле',
							pattern: {
								value: /^\d{12}$/,
								message: 'Введите ровно 12 цифр',
							},
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											type='text'
											id='inn'
											placeholder='ИНН'
											onChange={(e) => {
												const digitsOnly = e.target.value
													.replace(/\D/g, '')
													.slice(0, 12);
												field.onChange(digitsOnly);
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
						name='maritalStatus'
						rules={{
							required: 'Выберите значение из списка',
							validate: (value) =>
								Object.values(MaritalStatuses).includes(value) ||
								'Выберите значение из списка',
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											list='maritalList'
											id='maritalStatus'
											placeholder='Семейное положение'
										/>
										<datalist id='maritalList'>
											{Object.values(MaritalStatuses).map((item, index) => {
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
						name='education'
						rules={{
							required: 'Выберите значение из списка',
							validate: (value) =>
								Object.values(EducationTypes).includes(value) ||
								'Выберите значение из списка',
						}}
						render={({ field, fieldState: { error } }) => {
							return (
								<>
									<div>
										<Input
											{...field}
											list='educationList'
											id='education'
											placeholder='Образование'
										/>
										<datalist id='educationList'>
											{Object.values(EducationTypes).map((item, index) => {
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
		</>
	);
};
