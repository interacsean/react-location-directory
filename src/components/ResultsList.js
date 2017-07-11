import React, { Component } from "react";
import PropTypes from "prop-types";

import Location from "../services/Location";
import ListingData from "../services/ListingData";
import Result from "./Result";

/**
 * The list of search results.
 */
class ResultsList extends Component {

	static propTypes = {
		"searchTerm": PropTypes.string,
		"locCode": PropTypes.string,
	}

	static defaultProps = {
		"searchTerm": "",
		"locCode": "",
	}

	constructor(props){
		super(props);

		this.state = {
			"searchTerm": props.searchTerm,
			"locCode": props.locCode,
			"results": []
		};

		this._refreshPlaceDetails(props.locCode);
	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			"searchTerm": nextProps.searchTerm,
			"locCode": nextProps.locCode,
		});

		
		this._refreshPlaceDetails(nextProps.locCode);
	}

	_refreshPlaceDetails(locCode) {
		if (locCode !== ""){
			// Tidyup: Possibly a better way to chain these promises.
			Location.getPlaceDetails(locCode).then( ( placeDetails )=>{
				ListingData.getListingsNearPlace( placeDetails ).then( (results)=>{
					this.setState( {"results": results} );	
				} );
			});
		}
	}

	render(){
		return (
			<div className="ResultsList">
			{
				this.state.results.map((result)=>{
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

export default ResultsList;
