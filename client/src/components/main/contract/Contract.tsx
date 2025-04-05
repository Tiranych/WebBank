import React from 'react';
import { TContract } from 'types';

type ContractProps = {
	contract: TContract;
};

const Contract = ({ contract }: ContractProps) => {
	return <div>{contract.startDate.substring(0, 10)}</div>;
};

export { Contract };
