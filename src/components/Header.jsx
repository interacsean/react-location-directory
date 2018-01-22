import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Helpers from '../services/Helpers';
import SiteLogo from '../components/SiteLogo';
import SiteNav from '../components/SiteNav';
import SearchBox from '../components/SearchBox';


// class Header extends Component {

//   constructor(props){ super(props);
//     this.onSearchTermSelected = this.onSearchTermSelected.bind(this);
//   }

//   onSearchTermSelected(suggestionChosen){
//     console.log('returning onSearchTermSelected using <class></class>');
//     this.props.history.push(`/search/${Helpers.toUrlFriendly(suggestionChosen.description)}/${suggestionChosen.place_id}`)
//     //);
//   }

//   render() {
//     return (
//       <header className="siteHeader">
//         <SiteLogo />
//         <SiteNav />
//         <SearchBox 
//           className="searchBox" 
//           searchTerm={this.props.theSearchTerm}
//           onSearchTermSelected={this.onSearchTermSelected}
//         />
//       </header>
//     )
//   }
// }

const Header = function(props) {
  const onSearchTermSelected = (suggestionChosen) => (
    props.history.push(`/search/${Helpers.toUrlFriendly(suggestionChosen.description)}/${suggestionChosen.place_id}`)
  );
  return (
      <header className="siteHeader">
        <SiteLogo />
        <SiteNav />
        <SearchBox 
          className="searchBox" 
          searchTerm={props.searchTerm}
          onSearchTermSelected={onSearchTermSelected}
        />
      </header>
  );
}

Header.propTypes = {
  searchTerm: PropTypes.string,
  // onSuggestionSelected: PropTypes.func
}

Header.defaultProps = {
  searchTerm: '',
}

export default withRouter(Header);