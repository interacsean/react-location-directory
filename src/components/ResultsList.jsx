import React from 'react';
import PropTypes from 'prop-types';

import Result from './Result';

import './ResultsList.scss';

const ResultsList = ({ results, searching, resultSelected }) => (
  <div className="resultsListCtnr">
    {
      results.length === 0
        ? (
          <div className="notice">
            {
              searching
                ? 'Searching for groups in that location'
                : 'There were no listings found in that location'
            }
          </div>
          )
        : results.map(result => (
          <Result
            key={`${result.place_name}+${result.listing_name}`}
            listingName={result.listing_name}
            placeName={result.place_name}
            dist={result.dist}
            onSelect={resultSelected}
          />
        ))
    }
  </div>
);

ResultsList.propTypes = {
  // eslint-disable-next-line 
  results: PropTypes.array.isRequired,
  searching: PropTypes.bool.isRequired,
  resultSelected: PropTypes.func.isRequired,
};

export default ResultsList;
