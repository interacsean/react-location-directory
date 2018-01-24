import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import Helpers from '../services/Helpers';
import withLocDirRouter from '../components/withLocDirRouter';
import Header from '../components/Header';
import ResultsListCtnr from '../components/ResultsListCtnr';

import './Home.scss';

class Home extends Component {

  constructor(props) {
    super(props);

    this.onResultSelected = this.onResultSelected.bind(this);
  }

  onResultSelected (resultChosen) {
    this.props.history.push(
      `/listing/${Helpers.toUrlFriendly(resultChosen.listing_name)}/${resultChosen.id}/${this.props.theSearchTerm()}/${this.props.match.params.locCode}`
    );
  };

  render() {
    return (
    <div className="pg-Home">
      <Header searchTerm={this.props.theSearchTerm()} />
      {
        this.props.theSearchTerm()
          ? <ResultsListCtnr
            searchTerm={this.props.theSearchTerm()}
            locCode={this.props.match.params.locCode}
            onResultSelected={this.onResultSelected}
          />
          : <div style={{ padding: '20px' }}>Make your search above</div>
      }
    </div>
  )};
};

Home.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  theSearchTerm: PropTypes.func.isRequired
};

export default withLocDirRouter(Home);
