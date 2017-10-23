import React, { Component } from "react";
import "./Home.scss";

import SiteLogo from "../components/SiteLogo";
import SiteNav from "../components/SiteNav";
import SearchBox from "../components/SearchBox";
import ResultsList from "../components/ResultsList";
import Helpers from "../services/Helpers";

class Home extends Component {
  
  theSearchTerm(){
    return this.props.match.params.locCode ? 
      Helpers.fromUrlFriendly(this.props.match.params.locFriendly) :
      null;
  }

  render() {
    return (
      <div className="pg-Home">
        <header className="siteHeader">
          <SiteLogo/>
          <SiteNav/>
          <SearchBox searchTerm={this.theSearchTerm()}/>
        </header>
        { this.theSearchTerm() ? <ResultsList searchTerm={this.theSearchTerm()} locCode={this.props.match.params.locCode}/> : "" }
      </div>
    );
  }

}

export default Home;