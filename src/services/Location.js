
class Location {

    /**
     * @summary  Get suggestions of locations based on a full or partial search string
     *
     * @param    string  input  The full or partialsearch string 
     * @returns  Promise        A promise that resolves to an array of suggestions
     */
    static getSuggestions(input){

        return new Promise( (resolve, reject) => {

            try {
                /* 
                 * Using the globally available google module
                 * I am aware it's a bit ugly with it being global...
                 */
                // eslint-disable-next-line no-undef
                (new google.maps.places.AutocompleteService()).getPlacePredictions(
                    {
                        'input': input,
                        'types': ['(cities)']
                        //todo: 'location': get user's geolatlng
                    },
                    (placeResult, placesServiceStatus)=>{
                        if (placeResult === null){
                            reject(placesServiceStatus);
                        }else{
                            // could use Promise.all() if I need to get place details of each for LatLng purposes
                            resolve(placeResult.map( (place)=>{
                                // Redundant key filter.
                                let { description, place_id } = place;
                                return { description, place_id };
                                
                            } ));
                        }  
                    }
                )
            }catch(e){
                reject(e);
            }
            
        } );

    }

    static getPlaceDetails(placeId){

        return new Promise( (resolve, reject) => {

            try {
                /* 
                 * Using the globally available google module
                 * I am aware it's a bit ugly with it being global...
                 * For some reason, PlacesService also wants an HTML element
                 * to work properly.  Ok, here's one... go nuts.
                 */
                // eslint-disable-next-line no-undef
                (new google.maps.places.PlacesService(document.createElement('div'))).getDetails(
                    { placeId },
                    ( placeResult, placesServiceStatus )=>{
                        if (placeResult === null){
                            reject(placesServiceStatus);
                        }else{
                            resolve(placeResult);
                        }  
                    }
                );

            }catch(e){
                reject(e);
            }
            
        } );

    }

}

export default Location;
