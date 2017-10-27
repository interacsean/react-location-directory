import React, { Component } from "react";
import PropTypes from "prop-types";

import Result from "./Result";

import "./ResultsList.scss";

const ResultsList = ({results, searching, resultSelected})=>{

	return (
		<div className="resultsListCtnr">
      {
        results.length === 0 
          ? (
            <div className="notice">
              {
                searching
                  ? "Searching for groups in that location"
                  : "There were no listings found in that location"
              }
            </div>
            )
          : results.map((result)=>{
            return (
              <Result 
                key={result['place_name']+"+"+result['listing_name']}
                listingName={result['listing_name']}
                placeName={result['place_name']}
                dist={result.dist}
                onSelect={resultSelected}
              />
            );
          })
      }
    </div>
	);
}

ResultsList.propTypes = {
  "results": PropTypes.array.isReq,
  "searching": PropTypes.bool.isReq,
}

export default ResultsList;