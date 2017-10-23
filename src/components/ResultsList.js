import React, { Component } from "react";
import PropTypes from "prop-types";

import Location from "../services/Location";
import ListingData from "../services/ListingData";
import Result from "./Result";

import "./ResultsList.scss";

/**
 * The list of search results.
 */
class ResultsList extends Component {

  constructor(props){
    super(props);
    this._refreshPlaceDetails(props.locCode);
    this.state = {
      "searchTerm": props.searchTerm,
      "locCode": props.locCode,
      "results": [],
      "searching": true
    };
  }

  componentWillReceiveProps(nextProps) {
    this._refreshPlaceDetails(nextProps.locCode);
    this.setState({
      "searchTerm": nextProps.searchTerm,
      "locCode": nextProps.locCode,
      "searching": true
    });
  }

  _refreshPlaceDetails(locCode) {
    if (locCode !== ""){
      // Tidyup: Possibly a better way to chain these promises.
      Location.getPlaceDetails(locCode).then( ( placeDetails )=>{
        ListingData.getListingsNearPlace( placeDetails ).then( (results)=>{
          this.setState( {"results": results, "searching": false} );  
        } );
      });
    }
  }

  render(){
    return (
      <div className="resultsList">
      {
        this.state.results.length === 0 
          ? (
            <div className="notice">
              {
                this.state.searching
                  ? "Searching for groups in that location"
                  : "There were no listings found in that location"
              }
            </div>
            )
          : this.state.results.map((result)=>{
            return (
              <Result 
                 key={result['place_name']+"+"+result['listing_name']}
                listingName={result['listing_name']}
                placeName={result['place_name']}
                dist={result.dist}
              />
            );
          })
      }
      </div>
    );
  }
  
}

ResultsList.propTypes = {
  "searchTerm": PropTypes.string,
  "locCode": PropTypes.string,
}

ResultsList.defaultProps = {
  "searchTerm": "",
  "locCode": "",
}

export default ResultsList;
