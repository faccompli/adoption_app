import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';

const Component = () => (
    <StrictMode>
        <Router>
            <App />
        </Router>
    </StrictMode>
);


createRoot(document.getElementById('root')).render(<Component/>)