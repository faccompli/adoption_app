const Carousel = ({images}) => {
    console.log("Images =", images);


    return (
        <>
        {
            images.length ? images.map(image => <img key={image} src={image} alt="animal" />) : null
        }
        </>
    )
}

export default Carousel;