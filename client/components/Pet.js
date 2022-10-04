import { Link } from "react-router-dom";

const Pet = ({name, animal, breed, images, location, id}) => {
    let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
    if(images.length) hero = images[0].medium;

    return (
        <Link to={`/details/${id}`} className="pet">
            <img src={hero} alt={name} />
            <div className="info">
                <h1>{name}</h1>
                <h2>{ !animal ? null : `${animal} - ${breed} - ${location}`}</h2>
            </div>
        </Link>
    );
};

export default Pet;