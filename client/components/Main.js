import { useState, useEffect } from 'react';

const Main = () => {
    const handleSubmit = e => {
        e.preventDefault();
        console.log("Hey");
    }
    
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search" autoFocus/>
            </form>
        </main>
    )
};

export default Main;