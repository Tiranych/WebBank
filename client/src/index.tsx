import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const index = document.getElementById('root');

if (!index) {
	console.log('Root not found!');
} else {
	const root = createRoot(index);

	root.render(<App />);
}
