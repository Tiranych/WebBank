import React from 'react';
import { TCreditHistory } from 'types';

type CreditHistortyProps = {
	creditHistory: TCreditHistory;
};

const CreditHistory = ({ creditHistory }: CreditHistortyProps) => {
	return <div>{creditHistory.debtLoad}</div>;
};

export { CreditHistory };
