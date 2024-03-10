import React from 'react';
import ReactDOM from 'react-dom/client';

import '../normalize.css';
import './index.css';
import App from './App.jsx';
import './generic-media-query.css';

import GlobalProvider from './store/globalProvider.jsx';
import LenisSmoothScrolling from './components/LenisSmoothScrolling.jsx';
import AssetsPreloader from './components/AssetsPreloader.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalProvider>
            <AssetsPreloader>
                <LenisSmoothScrolling>
                    <App />
                </LenisSmoothScrolling>
            </AssetsPreloader>
        </GlobalProvider>
    </React.StrictMode>
);
