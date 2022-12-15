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
        const pf = new petfinder.Client({ apiKey: process.env.API_KEY, secret: process.env.SECRET });

        pf.animal.show(this.props.params.id)
        .then(res => {
            return res.data.animal
        })
        .then(animal => this.setState(Object.assign({ loading: false }, animal)))
        .catch(err => console.error(err.message));
    }

    // toggleModal = () => 

    
    render(){
        const { loading, showModal,url, species, breeds, contact, description, name, images, age, photos, primary_photo_cropped } = this.state;

        if(loading) return <h2>loading...</h2>

        return (
            <section className='details'>
                <Carousel images={photos} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${species} - ${breeds.primary} - ${contact.address.city}, ${contact.address.state}`}</h2>
                    <p>{age}</p>
                    <p>{description}</p>
                    <button><a href={url}>Adopt {name}</a></button>
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