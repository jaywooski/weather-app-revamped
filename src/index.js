import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import serviceWorker from "./serviceWorker";
// import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// serviceWorker.register();


