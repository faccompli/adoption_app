import { useState } from 'react';

const Carousel = ({images}) => {
    const [active, setActive] = useState(0);
    const handleIndexClick = e => {
        setActive(+e.target.dataset.index)
    }

    return (
        <>
        {
            images.length ? images.map((image, i) => <img className={i === active ? "active" : ""} key={image} src={image} alt="pet image" onClick={handleIndexClick} data-index={i} />) : null
        }
        </>
    )
}

export default Carousel;