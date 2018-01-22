import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Location from '../services/Location';
import ListingData from '../services/ListingData';
import ResultsList from './ResultsList';

/**
 * The list of search results.
 */
class ResultsListCtnr extends Component {

  constructor(props) {
    super(props);
    this.refreshPlaceDetails(props.locCode);
    this.state = {
      searchTerm: props.searchTerm,
      locCode: props.locCode,
      results: [],
      isSearching: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.refreshPlaceDetails(nextProps.locCode);
    this.setState({
      searchTerm: nextProps.searchTerm,
      locCode: nextProps.locCode,
      isSearching: true,
    });
  }

  refreshPlaceDetails(locCode) {
    if (locCode !== '') {
      // Tidyup: Possibly a better way to chain these promises.
      Location.getPlaceDetails(locCode).then((placeDetails) => {
        ListingData.getListingsNearPlace(placeDetails).then((results) => {
          this.setState({ results, isSearching: false });
        });
      });
    }
  }

  render() {
    return (
      <ResultsList
        results={this.state.results}
        searching={this.state.isSearching}
        onResultSelected={this.props.onResultSelected}
      />
    );
  }
}

ResultsListCtnr.propTypes = {
  searchTerm: PropTypes.string,
  locCode: PropTypes.string,
  onResultSelected: PropTypes.func.isRequired,
};

ResultsListCtnr.defaultProps = {
  searchTerm: '',
  locCode: '',
};

export default ResultsListCtnr;
