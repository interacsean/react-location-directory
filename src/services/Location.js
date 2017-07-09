
class Location {

    /**
     * @summary  Get suggestions of locations based on a full or partial search string
     *
     * @param    string  input  The full or partialsearch string 
     * @returns  Promise        A promise that resolves to an array of suggestions
     */
    static getSuggestions(input){

        let p = new Promise( (resolve, reject) => {

            try {
                /* 
                 * Using the globally available google module
                 * I am aware it's a bit ugly with it being global...
                 */
                // eslint-disable-next-line no-undef
                let gAcs = new google.maps.places.AutocompleteService();
                gAcs.getPlacePredictions(
                    {
                        'input': input,
                        'types': ['(cities)']
                        //todo: 'location': get user's geolatlng
                    },
                    (placeResult, placesServiceStatus)=>{
                        if (placeResult === null){
                            reject();
                        }else{
                            // could use Promise.all() if I need to get place details of each for LatLng purposes
                            resolve(placeResult.map( (place)=>{
                                let { description, place_id } = place;
                                return { description, place_id };
                                /*googlePlacesService = new google.maps.places.PlacesService(document.getElementById("q"));
                                googlePlacesService.getDetails({
                                    reference: predictions[i].reference
                                }, function(details, status){
                                    if(details){
                                        console.log(details.geometry.location.toString());
                                    }
                                });*/
                            } ));
                        }  
                    }
                )
            }catch(e){
                reject(e);
            }
            
        } );

        return p;

    }

}

export default Location;