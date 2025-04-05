import React from 'react';
import { TCredit } from 'types';

type CreditProps = {
	credit: TCredit;
};

const Credit = ({ credit }: CreditProps) => {
	return <div>{credit.idCredit}</div>;
};

export { Credit };
