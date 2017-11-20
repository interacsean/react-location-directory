import React from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import SiteLogo from '../components/SiteLogo';
import SiteNav from '../components/SiteNav';
import SearchBox from '../components/SearchBox';
import ResultsListCtnr from '../components/ResultsListCtnr';
import Helpers from '../services/Helpers';

import './Home.scss';

const Home = (props) => {
  const theSearchTerm = () => (
    props.match.params.locCode ?
      Helpers.fromUrlFriendly(props.match.params.locFriendly) :
      null
  );

  const newSearchTermSelected = (suggestionChosen) => {
    this.props.history.push(`/search/${Helpers.toUrlFriendly(suggestionChosen.description)}/${suggestionChosen.place_id}`);
  };

  const resultSelected = (resultChosen) => {
    this.props.history.push(`/listing/${Helpers.toUrlFriendly(resultChosen.description)}/${resultChosen.id}`);
  };

  return (
    <div className="pg-Home">
      <header className="siteHeader">
        <SiteLogo />
        <SiteNav />
        <SearchBox
          searchTerm={theSearchTerm()}
          className="searchBox"
          suggestionSelected={newSearchTermSelected}
        />
      </header>
      {
        theSearchTerm()
          ? <ResultsListCtnr
            searchTerm={theSearchTerm()}
            locCode={props.match.params.locCode}
            resultSelected={resultSelected}
          />
          : ''
      }
    </div>
  );
};

Home.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default withRouter(Home);
