import React from 'react';

import { TClient } from 'App';

type MainProps = {
	client: TClient;
};

const Main = ({ client }: MainProps) => {
	return <div>{client.income}</div>;
};

export default Main;
