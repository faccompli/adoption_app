import { Link } from "react-router-dom";

const Pet = ({name, animal, breed, images, location, id}) => {
    let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
    if(images.length) hero = images[0].medium;

    return (
        <Link to={`/details/${id}`} className="pet">
            <div className="pet-photo-container">
                <img className="pet-photo" src={hero} alt={name} />
            </div>
            <div className="pet-info">
                <h1>{name}</h1>
                <p>{ !animal ? null : `${animal} - ${breed} - ${location}`}</p>
            </div>
        </Link>
    );
};

export default Pet;