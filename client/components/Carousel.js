import { useState } from 'react';

const Carousel = ({images}) => {
    const [active, setActive] = useState(0);
    const handleIndexClick = e => {
        setActive(+e.target.dataset.index);
    }

    console.log('IMAGES=', images);

    return (
        <div className="carousel">
            <div className="carousel-display"><img src={images[active].large}/></div>
            <nav className='carousel-nav'>
            {
                images.length ? 
                    images.map((image, i) => 
                        <img className={i === active ? "active" : ""} 
                        key={image.large} 
                        src={image.large} 
                        alt="pet image" 
                        onClick={handleIndexClick}
                        data-index={i} />) : 
                    null
            }
            </nav>
        </div>
    )
}

export default Carousel;