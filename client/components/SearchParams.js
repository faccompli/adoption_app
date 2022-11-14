import { useState, useEffect, useContext } from 'react';
import ThemeContext from './ThemeContext';
import Results from './Results';
// import useBreedList from './useBreedList';


const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [animalTypes, setAnimalTypes] = useState([]); 
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    // const [breeds] = useBreedList(animal); //maybe I don't need this custom hook anymore
    const [breedsList, setBreedsList] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(() => {
        requestPets();
    }, []);

    // This isn't even doing anything!
    // useEffect(() => {
    //     console.log("breedsList =", breedsList);
    //     const currentBreeds = [];
    //     pets.forEach(pet => {
    //         const petBreed =  pet.breeds.primary;

    //         if(!currentBreeds.includes(petBreed)){
    //             currentBreeds.push(petBreed);
    //         }
    //     });
        
    // }, [animal]); //Change requestPets to whenever you change the Animal drop down? handleAnimal Change here?

    useEffect(() => {
        requestPets({type: animal, breed: breed});
        console.log("Are you running too!");
    }, [breed]);

    //Combine this with another useEffect by adding location to the array? The real fix comes from inside the requestPets function to handle location
    useEffect(() => {
        requestPets();
    }, [location])

    function requestPets(type = {}){        
        const pf = new petfinder.Client({ apiKey: process.env.API_KEY, secret: process.env.SECRET });
        
        //Set the setAnimalTypes here
        pf.animalData.types() 
        .then(res => {
            const types = res.data.types.map(type => type.name);
            setAnimalTypes(types);
        })
        .catch(err => console.error(err.message));

        /* test below */
        console.log("TYPE=", type);
        pf.animal.search({ location: "Jersey City, NJ"})
        .then(res => console.log("Search working for location?", res.data.animals))
        .catch(err => console.error(err.message));


        /* test above */


        //Display search results (default is where the type == nothing - which means everything)
        pf.animal.search(type)
        .then(res => {
            const petsWithPhotosOnly = res.data.animals.filter(animal => {
                if(animal.photos.length) return animal;
            }); 

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
        .catch(err => console.error(err.message));
    }

    const handleSubmit = e => {
        e.preventDefault();
        //Take the location
        const location = e.target.location.value.split(',');

        //Protect against inproper responses
        if(location.length !== 2){
            alert("Inproper response. Please enter a city and a state seaprated by a comma")
            e.target.location.value = "";
            e.target.location.focus()
        } else {
            const city = location[0];
            const state = location[1].toUpperCase();

            //use setLocation here I think
            setLocation(`${city}, ${state}`);
        }
        
    }

    const handleLocationChange = e => {
        setLocation(e.target.value);
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
                    <input type="text" id="location" name="location" placeholder="City, State Abbreviation" value={location} onChange={handleLocationChange} autoFocus/>
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