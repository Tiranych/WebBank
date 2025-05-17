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
}: {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
				try {
					setIsLoading(true);
					const response = await signin<TAuthResponse>(data);
					const responseCamelized = camelizeData([response])[0];
					if (response.success) {
						localStorage.setItem('id_client', String(responseCamelized.idClient));
						localStorage.setItem('AUTH_TOKEN', responseCamelized.authToken);
						window.location.assign(
							responseCamelized.idClient === Number(process.env.ADMIN_ID)
								? '/analytic'
								: '/'
						);
						setShowModal(false);
					} else {
						setErrorText(response.error);
					}
				} catch (e: any) {
					console.log(e.message);
				} finally {
					setIsLoading(false);
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
