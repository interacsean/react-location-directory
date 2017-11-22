import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import SiteLogo from '../components/SiteLogo';
import SiteNav from '../components/SiteNav';
import SearchBox from '../components/SearchBox';
import ResultsListCtnr from '../components/ResultsListCtnr';
import Helpers from '../services/Helpers';

import './Home.scss';

class Home extends Component {

  constructor(props) {
    super(props);

    this.resultSelected = this.resultSelected.bind(this);
    this.newSearchTermSelected = this.newSearchTermSelected.bind(this);
    this.theSearchTerm = this.theSearchTerm.bind(this);
  }

  theSearchTerm() {
    this.props.match.params.locCode ?
      Helpers.fromUrlFriendly(props.match.params.locFriendly) :
      null
  };

  newSearchTermSelected(suggestionChosen) {
    this.props.history.push(`/search/${Helpers.toUrlFriendly(suggestionChosen.description)}/${suggestionChosen.place_id}`);
  };

  resultSelected (resultChosen) {
    this.props.history.push(`/listing/${Helpers.toUrlFriendly(resultChosen.description)}/${resultChosen.id}`);
  };

  render() {(
    <div className="pg-Home">
      <header className="siteHeader">
        <SiteLogo />
        <SiteNav />
        <SearchBox
          searchTerm={this.theSearchTerm()}
          className="searchBox"
          suggestionSelected={newSearchTermSelected}
        />
      </header>
      {
        theSearchTerm()
          ? <ResultsListCtnr
            searchTerm={this.theSearchTerm()}
            locCode={this.props.match.params.locCode}
            resultSelected={resultSelected}
          />
          : ''
      }
    </div>
  )};
};

Home.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default withRouter(Home);
