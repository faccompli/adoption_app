import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import ThemeContext from './components/ThemeContext';
import './stylesheets/main.css';


const Component = () => {
    const theme = useState("darkblue");

    return (
        <StrictMode>
            <ThemeContext.Provider value={theme}>
                <Router>
                    <App />
                </Router>
            </ThemeContext.Provider>
        </StrictMode>
    );
};


createRoot(document.getElementById('root')).render(<Component/>)