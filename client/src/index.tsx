import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App';
import { IsAuthContext } from './contexts';

const index = document.getElementById('root');

if (!index) {
	console.log('Root not found!');
} else {
	const root = createRoot(index);

	root.render(
		<BrowserRouter>
			<IsAuthContext.Provider value={!!localStorage.getItem('AUTH_TOKEN')}>
				<App />
			</IsAuthContext.Provider>
		</BrowserRouter>
	);
}
