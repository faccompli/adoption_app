import { useState, useEffect, useContext } from 'react';
import ThemeContext from './ThemeContext';
import Results from './Results';
import useBreedList from './useBreedList';

// const pf = new petfinder.Client({ apiKey: process.env.API_KEY, secret: process.env.SECRET });


// pf.animal.search()
// .then(res => {
//     const animals = res.data.animals;

//     animals.forEach(animal => {
//         const pic = animal.photos[0].large;
//         const description = animal.description
//         const name = animal.name;
       
//         const img = document.createElement('img');
//         const p = document.createElement('p');
    
//         img.src = pic
//         img.alt = description
//         p.textContent = `Name: ${name} Description: ${description}`;
        
//         document.querySelector('body').prepend(img, p);

//     })

// });

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]; //Remove this eventually

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

    useEffect(() => {
        const currentBreeds = [];
        pets.forEach(pet => currentBreeds.push(pet.breeds.primary));
        
        console.log("What are the current breeds", currentBreeds);
    }, [requestPets]); //Change requestPets to whenever you change the Animal drop down? handleAnimal Change here?

    //used to be async function
    function requestPets(){
        // const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
        // const json = await res.json();
        const pf = new petfinder.Client({ apiKey: process.env.API_KEY, secret: process.env.SECRET });

        pf.animal.search()
        .then(res => {
            const petsWithPhotosOnly = res.data.animals.filter(animal => {
                if(animal.photos.length != 0) return animal;
            });

            setPets(petsWithPhotosOnly);
        })
        .catch(err => console.error(err.message));
        // setPets(json.pets);
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
        <>
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
                        <option value="All">All</option>
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
                        <option value="All">All</option>
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
            <Results pets={pets} />
        </>
    )
};

export default SearchParams;