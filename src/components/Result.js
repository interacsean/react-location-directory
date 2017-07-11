import React, { Component } from "react";

class Result extends Component {
	render() {
	 	return(
			<div className="listingResult">
				<h2>{this.props.listingName}</h2>
				<h3>{this.props.placeName}</h3>
				<span className="dist">{this.props.dist} miles away</span>
			</div>
		)
	}
}

export default Result;