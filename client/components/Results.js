import Pet from './Pet';

const Results = ({ pets }) => (
    <div className="search">
        {!pets.length ? (
            <h1>No Pets Found</h1>
        ) : (
            pets.map(pet => {
                
                return (
                <Pet 
                    animal={pet.animal}
                    key={pet.id}
                    name={pet.name}
                    breed={pet.breed}
                    images={pet.photos}
                    location={`${pet.city}, ${pet.state}`}
                    id={pet.id}
                />
            )})
        )}
    </div>
);

export default Results;