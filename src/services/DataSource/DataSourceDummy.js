
class DataSourceDummy {

  /**
   * Creates a fake set of locations
   */
  static listingsByLocation(placeData) {
    // This gets mutated...
    let randPlaces = ['%1', '%1 North', '%1 South', 'Old %1', '%1ton',
      'Little %1', 'Oldsborough', 'Newbury', 'Springvale'];

    const randNames = ['%1 club', 'The %1s', '%1 group', 'United %1',
      '%2 club', 'The %2s', '%2 group', 'United %2'];

    const results = [];
    /*
     * Loop for a random number of times up until the INITIAL length of randPlaces.
     * Tidyup: This gets a bit `imperitive` so could be up for refactoring one day... one day...
     */
    // Tidyup: linter tells me "Don't make functions within a loop  no-loop-func"
    const loopLength = Math.floor((randPlaces.length - 3) * Math.random()) + 3;
    // eslint-disable-next-line 
    for (let i = 0; i < loopLength; i = i + 1) {
      const randPlaceKey = Math.floor(randPlaces.length * Math.random());

      // Tidyup: DEBUGGING
      if (typeof randPlaces[randPlaceKey] === 'undefined') {
        // eslint-disable-next-line
        debugger; 
      }

      results.push(DataSourceDummy.createFakeListing(
        placeData, randPlaces[randPlaceKey], randNames,
      ));

      randPlaces = [].concat(randPlaces.slice(0, randPlaceKey), randPlaces.slice(randPlaceKey + 1));
    }

    return Promise.resolve(results);
  }

  static createFakeListing(placeName, randPlace, randNames) {
    // Tidyup: Probably some sweet ES6 destructuring stuff could clean up here
    // const placeNameParts = placeName.split(",");
    const placeNameParts = [
      placeName.address_components[0].long_name,
      placeName.address_components[1].long_name,
    ];

    return {
      id: Math.floor(Math.random() * 100),
      listing_name: randNames[Math.floor(Math.random() * randNames.length)]
        .replace(/%1/g, placeNameParts[0])
        .replace(/%2/g, placeNameParts[1]), // Could use reduce on placeNameParts and use 3rd arg for %token
      place_name: randPlace.replace(/%1/g, placeNameParts[0]),
      // Tidyup: dist should probably actually be calculated in ListingData from a returned LatLng
      dist: Math.round(Math.random() * 25) * 10,
    };
  }
}

export default DataSourceDummy;
