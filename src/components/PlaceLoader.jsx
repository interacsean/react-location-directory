
const PlaceLoader = (preLoadFn) => {
    
    const mapPreloadToProps = await preLoadFn;
    return (Component) => <Component {...mapPreloadToProps} />
}

export default PlaceLoader;
