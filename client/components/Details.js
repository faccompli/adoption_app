import { Component } from 'react';
import { useParams } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

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
        fetch(`http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`)
        .then(res => res.json())
        .then(json => this.setState(Object.assign({ loading: false }, json.pets[0])))
        .catch(err => console.error(err.message));
    }

    // toggleModal = () => 

    
    render(){
        const { loading, showModal, animal, breed, city, state, description, name, images } = this.state;

        console.log(images[0]);
        
        return (
            <section>
                {
                    images.length ? images.map(image => <img src={image} alt="animal" />) : null
                }
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
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