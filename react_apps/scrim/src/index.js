import React from 'react'
import ReactDOM from 'react-dom/client'

import {pageProps} from './components/props'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/hlxMOD.css';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App {...pageProps} />
    </React.StrictMode>
)
reportWebVitals(console.log)