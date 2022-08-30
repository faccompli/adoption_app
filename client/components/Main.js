import { useState, useEffect } from 'react';

const Main = () => {
    const [location, setLocation] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        e.target.location.value = "";
    }

    const handleChange = e => {
        setLocation(e.target.value);
    }
    
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="text" name="location" placeholder="Search" value={location} onChange={handleChange} autoFocus/>
                <input type="submit" value="Submit"></input>
            </form>
        </main>
    )
};

export default Main;