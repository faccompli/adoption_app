import { useState, useEffect, useContext } from 'react';
import ThemeContext from './ThemeContext';
import Results from './Results';
import useBreedList from './useBreedList';

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(() => {
        requestPets();
    }, []);

    async function requestPets(){
        const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
        const json = await res.json();

        setPets(json.pets);
    }

    const handleSubmit = e => {
        e.preventDefault();

        requestPets();
    }

    const handleLocationChange = e => {
        setLocation(e.target.value);
    }

    const handleAnimalChange = e => {
        setAnimal(e.target.value);
        setBreed("");
    }

    const handleBreedChange = e => {
        setBreed(e.target.value);
    }

    const handleThemeChange = e => {
        setTheme(e.target.value);
    }
    
    return (
        <main>
            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="location">
                        Location
                        <input type="text" id="location" name="location" placeholder="Location" value={location} onChange={handleLocationChange} autoFocus/>
                    </label>

                    <label htmlFor="animal">
                        Animal
                        <select
                            id="animal"
                            value={animal}
                            onChange={handleAnimalChange}
                            onBlur={handleAnimalChange}
                        >
                            <option />
                            {ANIMALS.map(animal => (
                                <option key={animal} value={animal}>{animal}</option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="breed">
                        Breed
                        <select
                            disabled={!breeds.length}
                            id="breed"
                            value={breed}
                            onChange={handleBreedChange}
                            onBlur={handleBreedChange}
                        >
                            <option />
                            {breeds.map(breed => (
                                <option key={breed} value={breed}>{breed}</option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="theme">
                        Theme
                        <select
                            value={theme}
                            onChange={handleThemeChange}
                            onBlur={handleThemeChange}
                        >
                            <option value="darkblue">Dark Blue</option>
                            <option value="thistle">Thistle</option>
                        </select>
                    </label>

                    <button style={{ backgroundColor: theme }}>Submit</button>
                </form>
            </section>
            <Results pets={pets} />
        </main>
    )
};

export default SearchParams;