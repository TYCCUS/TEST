import React from 'react';
import ReactDOM from 'react-dom/client';
import { data } from './assets/data';
import './css/hlxMOD.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
                <App {...data}/>
        </React.StrictMode>
        );

reportWebVitals(console.log);
