import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';

import App from './App';
import { IsAuthContext } from './contexts';

const index = document.getElementById('root');

if (!index) {
	console.log('Root not found!');
} else {
	const root = createRoot(index);

	root.render(
		<HashRouter>
			<IsAuthContext.Provider value={!!localStorage.getItem('AUTH_TOKEN')}>
				<App />
			</IsAuthContext.Provider>
		</HashRouter>
	);
}
