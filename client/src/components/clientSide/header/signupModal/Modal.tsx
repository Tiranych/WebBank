import React, { useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { TAuthResponse } from 'types';

import { signup } from '@services/signup';

import {
	Button,
	ButtonBox,
	ErrorText,
	Form,
	Img,
	Inner,
	Input,
	InputWrapper,
	ShowIcon,
	Wrapper,
} from './Modal.styled';

export const SignupModal = ({
	setShowModal,
	setIsLoading,
	setIsAuth,
}: {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [errorText, setErrorText] = useState('');
	const methods = useForm({
		mode: 'all',
	});

	const { control } = methods;
	const password = useWatch({ control, name: 'password' });

	const handleCloseClick = () => {
		setShowModal(false);
	};

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<Wrapper
			onSubmit={methods.handleSubmit(async (data) => {
				if (setIsLoading && setIsAuth) {
					try {
						setIsLoading(true);
						const response = await signup<TAuthResponse>(data);
						if (response.success) {
							setIsAuth(true);
							window.location.assign('/#/');
							setShowModal(false);
						} else {
							setErrorText(response.error);
						}
					} catch (e: any) {
						console.log(e.message);
					} finally {
						setIsLoading(false);
					}
				}
			})}
		>
			<ButtonBox>
				<button type='button' onClick={handleCloseClick}>
					<Img src='./assets/delete_icon.svg' alt='Закрыть' />
				</button>
			</ButtonBox>
			<Inner>
				<FormProvider {...methods}>
					<Form>
						<Controller
							control={control}
							name='username'
							rules={{ required: 'Обязательное поле' }}
							render={({ field, fieldState: { error } }) => {
								return (
									<>
										<InputWrapper>
											<Input
												{...field}
												type='text'
												id='username'
												placeholder='Логин'
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
							name='password'
							rules={{ required: 'Обязательное поле' }}
							render={({ field, fieldState: { error } }) => {
								return (
									<>
										<InputWrapper>
											<Input
												{...field}
												type={showPassword ? 'text' : 'password'}
												id='password'
												placeholder='Пароль'
											/>
											<ShowIcon onClick={handleShowPassword} />
											<ErrorText $enabled={!!error}>
												{error?.message}
											</ErrorText>
										</InputWrapper>
									</>
								);
							}}
						/>
						<Controller
							control={control}
							name='passwordConfirm'
							rules={{
								validate: (value) => {
									if (password === value) {
										return true;
									} else {
										return 'Пароли не совпадают';
									}
								},
							}}
							render={({ field, fieldState: { error } }) => {
								return (
									<>
										<InputWrapper>
											<Input
												{...field}
												type={'password'}
												id='passwordConfirm'
												placeholder='Подтвердите пароль'
												onPaste={(e: any) => {
													e.preventDefault();
												}}
											/>
											<ErrorText $enabled={!!error}>
												{error?.message}
											</ErrorText>
										</InputWrapper>
									</>
								);
							}}
						/>
						<Button type='submit' $disabled={!methods.formState.isValid}>
							Регистрация
						</Button>
					</Form>
				</FormProvider>
			</Inner>
		</Wrapper>
	);
};
