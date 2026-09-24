import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css';
import App from './App';
import { UnitProvider } from "./context/UnitContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<UnitProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</UnitProvider>
	</React.StrictMode>
);
