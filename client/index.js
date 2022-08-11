import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';

const Component = () => (
    <>
        <h1>Testing</h1>
        <App />
    </>
);


createRoot(document.getElementById('root')).render(<Component/>)