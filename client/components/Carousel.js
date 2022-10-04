import { useState } from 'react';

const Carousel = ({images}) => {
    const [active, setActive] = useState(0);
    const handleIndexClick = e => {
        setActive(+e.target.dataset.index)
    }

    console.log('IMAGES=', images);

    return (
        <>
        {
            images.length ? images.map((image, i) => <img className={i === active ? "active" : ""} key={image.large} src={image.large} alt="pet image" onClick={handleIndexClick} data-index={i} />) : null
        }
        </>
    )
}

export default Carousel;