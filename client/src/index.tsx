import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App';

const index = document.getElementById('root');

if (!index) {
	console.log('Root not found!');
} else {
	const root = createRoot(index);

	root.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
}
