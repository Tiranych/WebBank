import React, { ReactNode } from 'react';

import { Wrapper } from './Container.styled';

type ContainerProps = {
	children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
	return <Wrapper>{children}</Wrapper>;
};
