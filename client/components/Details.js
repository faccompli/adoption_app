import { Component } from 'react';
import { useParams } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Carousel from './Carousel';
import ThemeContext from './ThemeContext';

class Details extends Component {
    state = { 
        loading: true, 
        showModal: false,
        animal: '',
        breed: '',
        city: '',
        state: '',
        description: '',
        name: '',
        images: []
    };

    componentDidMount(){

        // fetch(`http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`)
        // fetch(`https://api.petfinder.com/v2/animals/${this.props.params.id}`)
        const pf = new petfinder.Client({ apiKey: process.env.API_KEY, secret: process.env.SECRET });

        pf.animal.show(this.props.params.id)
        .then(res => {
            console.log('DIDMOUNT = ', res.data.animal);
            return res.data.animal
        })
        // .then(json => this.setState(Object.assign({ loading: false }, json.pets[0])))
        .then(animal => this.setState(Object.assign({ loading: false }, animal)))
        .catch(err => console.error(err.message));
    }

    // toggleModal = () => 

    
    render(){
        const { loading, showModal, animal, breed, city, state, description, name, images, age, photos, primary_photo_cropped } = this.state;

        console.log('details =', photos)

        if(loading) return <h2>loading...</h2>

        return (
            <section>
                <Carousel images={photos} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
                    <p>{age}</p>
                    <p>{description}</p>
                    <button>Adopt {name}</button>
                </div>
            </section>
        )
    }
}

const WrappedDetails = () => {
    const params = useParams();

    return (
        <ErrorBoundary>
            <Details params={params} />
        </ErrorBoundary>
    )
}

export default WrappedDetails;