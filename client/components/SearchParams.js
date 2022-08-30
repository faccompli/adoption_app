import { useState, useEffect } from 'react';
import ThemseContext from './ThemeContext';

const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);
    const [theme, setTheme] = useContext(ThemeContext);

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
                <input type="text" name="location" placeholder="Location" value={location} onChange={handleChange} autoFocus/>
                <input type="submit" value="Submit"></input>
            </form>
        </main>
    )
};

export default SearchParams;