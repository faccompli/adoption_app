import Pet from './Pet';

const Results = ({ pets }) => (
    <div className="search">
        {!pets.length ? (
            <h1>No Pets Found</h1>
        ) : (
            pets.map(pet => {
                let distance;
                if(pet.distance !== null) {
                    distance = `~${pet.distance.toFixed(0)} Miles Away`; 
                } else {
                    distance = "";
                }

                return (
                <Pet 
                    animal={pet.species}
                    key={pet.id}
                    name={pet.name}
                    breed={pet.breeds.primary}
                    images={pet.photos}
                    location={`${pet.contact.address.city}, ${pet.contact.address.state} ${distance}`}
                    id={pet.id}
                />
            )})
        )}
    </div>
);

export default Results;