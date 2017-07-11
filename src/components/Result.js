import React, { Component } from "react";

class Result extends Component {
	render() {
	 	return(
			<div className="listingResult">
				<h2>{this.props.listingName}</h2>
				<h3>{this.props.placeName}</h3>
				<span>{this.props.dist}</span>
			</div>
		)
	}
}

export default Result;