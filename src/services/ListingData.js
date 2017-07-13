
// Replace this with a `DataSource` linked to something actual.
import DataSource from "./DataSource/DataSourceDummy.js";

// class ListingDataRequestObj {

//    * This is more like an interface than an object that needs to be used

//   constructor( obj ){

//   }
// }

class ListingData {

  /**
   * @summary  Get listings nearby a place
   *
   * @param  LocationRequestObj  place  An object containing the following keys:
   *  - @string   description      Text description of the place
   *  - @string   place_id        Unique identifier of the place, currently reflects
   *                    the google maps places place_id.
   *
   * @returns  Promise    A promise that resolves to an array of listings
   */
  static getListingsNearPlace( placeData ){

    /*
     * This clearly just returns test data and would need to be coded out
     * to connect to another data service / API.
     *
     * I also know this is not the most effective way to even provide test
     * data. In reality there 
     */
    return new Promise( (resolve, reject)=>{
      
      // Proxy at the moment
      return DataSource.listingsByLocation( placeData )
        .then( resolve )
        .catch( reject );

    });

  }

}

export default ListingData;