import React, { useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { TAuthResponse } from 'types';

import { signin } from '@services/signin';

import { camelizeData } from '@utils/camelize';

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

export const SigninModal = ({
	setShowModal,
	setIsLoading,
	setIsAuth,
	setIsAdmin,
}: {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
	setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [errorText, setErrorText] = useState('');
	const methods = useForm({
		mode: 'all',
	});

	const { control } = methods;

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
						const response = await signin<TAuthResponse>(data);
						const responseCamelized = camelizeData([response]);
						console.log(typeof process.env.ADMIN_ID);
						if (response.success) {
							setIsAuth(true);
							if (
								responseCamelized[0].idClient ===
								(Number(process.env.ADMIN_ID) || -1)
							) {
								setIsAdmin(true);
								// Хард код id админа
								window.location.assign('/analytic');
							} else {
								window.location.assign('/');
							}
							setShowModal(false);
						} else {
							setErrorText(response.error);
						}
					} catch (e: any) {
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
												{error?.message}
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
											<ErrorText $enabled={!!errorText || !!error}>
												{errorText ? errorText : error?.message}
											</ErrorText>
										</InputWrapper>
									</>
								);
							}}
						/>
						<Button type='submit' $disabled={!methods.formState.isValid}>
							Войти
						</Button>
					</Form>
				</FormProvider>
			</Inner>
		</Wrapper>
	);
};
