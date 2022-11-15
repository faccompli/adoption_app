import { useState, useEffect, useContext } from 'react';
import ThemeContext from './ThemeContext';
import Results from './Results';


const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [animalTypes, setAnimalTypes] = useState([]); 
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [breedsList, setBreedsList] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(() => {
        const type = {};

        if(animal.length) type.type = animal;
        if(location.length) type.location = location;
        if(breed.length) type.breed = breed;

        requestPets(type);
    }, [breed, location]);

    function requestPets(type = {}){        
        const pf = new petfinder.Client({ apiKey: process.env.API_KEY, secret: process.env.SECRET });
        
        //Set the setAnimalTypes here
        pf.animalData.types() 
        .then(res => {
            const types = res.data.types.map(type => type.name);
            setAnimalTypes(types);
        })
        .catch(err => console.error(err.message));

        //Display search results (default is where the type == nothing - which means everything)
        pf.animal.search(type)
        .then(res => {
            console.log("Where is location doing its thing?", type, res.data.animals);
            let petsWithPhotosOnly = res.data.animals.filter(animal => {
                if(animal.photos.length) return animal;
            }); 

            if(type.location){
                //Sort by distance, closest to farthest, only if location is given.
                petsWithPhotosOnly = petsWithPhotosOnly.sort((a,b) => a.distance - b.distance);
            }
            
            setPets(petsWithPhotosOnly);

            //Set breedsList here? It has to be in this function somewhere - maybe in the filter above? 
            const currentBreedsList = res.data.animals.map(animal => animal.breeds.primary);
            const currentBreedsListNoDuplicates = [];
            //this is sloppy, fix later.
            currentBreedsList.forEach(breed => {
                if(!currentBreedsListNoDuplicates.includes(breed)) currentBreedsListNoDuplicates.push(breed);
            });

            setBreedsList(currentBreedsListNoDuplicates.sort());
        })
        .catch(err => console.error('ERROR MESSAGE', err.message));
    }

    const handleSubmit = e => {
        e.preventDefault();
        const currentLocation = e.target.location.value.split(/,\s*/);

        //Protect against inproper responses
        if(currentLocation.length !== 2){
            alert("Inproper response. Please enter a city and a state seaprated by a comma")
            e.target.location.value = "";
            e.target.location.focus()
        } else {
            const city = currentLocation[0];
            const state = currentLocation[1].toUpperCase();
            
            setLocation(`${city}, ${state}`);
        }
    }

    const handleAnimalChange = e => {
        let animal;
        if(e.target.value == "All"){
            animal = "";
        } else {
            animal = e.target.value;
        }

        setAnimal(animal);
        requestPets({ type: animal }); //Should this be triggered by useEffect? Remove it?
        //Update breedsList here too - or in the requestPets section?


        //Make this request with the target animal. Update the submit button so that it doesn't override this.
        setBreed(""); //This is to default to all the breeds (hence "All" in the select html - does this need fixing?)
    }

    const handleBreedChange = e => {
        let breed; 
        if(e.target.value == "All"){
            breed = "";
        } else {
            breed = e.target.value;
        }

        setBreed(breed);
        //change happens in useEffect that's watchign breed
    }

    const handleThemeChange = e => {
        setTheme(e.target.value);
    }
    
    return (
        <>
            <label htmlFor="animal">
                Animal
                <select
                    id="animal"
                    value={animal}
                    onChange={handleAnimalChange}
                    onBlur={handleAnimalChange}
                >
                    <option value="All">All</option>
                    {animalTypes.map(animal => (
                        <option key={animal} value={animal}>{animal}</option>
                    ))}
                </select>
            </label>

            <label htmlFor="breed">
                Breed
                <select
                    // disabled={!breeds.length} //This is so its grayed out
                    disabled={!breedsList.length}
                    id="breed"
                    value={breed}
                    onChange={handleBreedChange}
                    onBlur={handleBreedChange}
                >
                    <option value="All">All</option>
                    {breedsList.map(breed => (
                        <option key={breed} value={breed}>{breed}</option>
                    ))}
                </select>
            </label>

            <form onSubmit={handleSubmit}>
                <label htmlFor="location">
                    Location
                    <input type="text" id="location" name="location" placeholder="City, State Abbreviation" autoFocus/>
                </label>

                {/* <label htmlFor="theme">
                    Theme
                    <select
                        value={theme}
                        onChange={handleThemeChange}
                        onBlur={handleThemeChange}
                    >
                        <option value="thistle">Thistle</option>
                        <option value="darkblue">Dark Blue</option>
                    </select>
                </label> */}

                {/* <button style={{ backgroundColor: theme }}>Submit</button> */}
                <button style={{ backgroundColor: "lightblue" }}>Submit</button>
            </form>
            <Results pets={pets} />
        </>
    )
};

export default SearchParams;