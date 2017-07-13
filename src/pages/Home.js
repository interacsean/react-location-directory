import React, { Component } from "react";
import "./Home.scss";

import SiteLogo from "../components/SiteLogo";
import SiteNav from "../components/SiteNav";
import SearchBox from "../components/SearchBox";
import ResultsList from "../components/ResultsList";
import Helpers from "../services/Helpers";

class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = { 
      "searchTerm": props.match.params.locCode 
        ? Helpers.fromUrlFriendly(props.match.params.locFriendly) 
        : null, 
      "locCode": props.match.params.locCode
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.match.params.locCode){
      this.setState({
        "searchTerm": nextProps.match.params.locCode 
          ? Helpers.fromUrlFriendly(nextProps.match.params.locFriendly) 
          : null, 
        "locCode": nextProps.match.params.locCode
      });
    }
  }

  render() {
    return (
      <div className="pg-Home">
        <header className="siteHeader">
          <SiteLogo/>
          <SiteNav/>
          <SearchBox searchTerm={this.state.searchTerm}/>
        </header>
        { this.state.searchTerm ? <ResultsList searchTerm={this.state.searchTerm} locCode={this.state.locCode}/> : "" }
      </div>
    );
  }

}

export default Home;