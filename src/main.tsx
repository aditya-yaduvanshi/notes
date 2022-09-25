import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import NotesProvider from './contexts/notes';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<NotesProvider>
			<App />
		</NotesProvider>
	</React.StrictMode>
);
