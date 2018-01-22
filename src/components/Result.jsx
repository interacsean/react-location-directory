import React from 'react';
import PropTypes from 'prop-types';

const Result = props => (
  <div
    className="listingResult"
    onClick={props.onSelect}
    role="menuitem"
    tabIndex={0}
  >
    <h2>{props.listingName}</h2>
    <h3>{props.placeName}</h3>
    <span className="dist">{props.dist} miles away</span>
  </div>
);

Result.propTypes = {
  // key: PropTypes.string,
  listingName: PropTypes.string.isRequired,
  placeName: PropTypes.string.isRequired,
  dist: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Result;
