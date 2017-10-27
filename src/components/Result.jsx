import React, { Component } from "react";
import PropTypes from "prop-types";

const Result = (props)=>{

	return(
		<div className="listingResult" onclick={props.onSelect}>
		  <h2>{props.listingName}</h2>
		  <h3>{props.placeName}</h3>
		  <span className="dist">{props.dist} miles away</span>
		</div>
	)
}

Result.propTypes = {
  "key": PropTypes.string.isReq,
  "listingName": PropTypes.string.isReq,
  "placeName": PropTypes.string.isReq,
  "dist": PropTypes.number.isReq,
  "onSelect": PropTypes.func.isReq
}

export default Result;