import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Location from "../services/Location";
import Helpers from "../services/Helpers";

/**
 * The dropdown portion of the SearchBox.
 *
 * In retrospect, this doesn't need to be a separate component, and could have 
 * been engineered into SearchBox, but I was happy to practice communicating 
 * data between two components.
 */
class SearchAutoComplete extends Component {

  static propTypes = {
    searchTerm: PropTypes.string
  }

  static defaultProps = {
    searchTerm: ""
  }

  constructor(props){
    super(props);
    this.state = {'suggestions': []};
    this._updateSuggestions(props);
  }

  componentWillReceiveProps(nextProps) {
    this._updateSuggestions(nextProps);
  }

  _updateSuggestions(props){
    Location.getSuggestions(props.searchTerm)
      .then( (suggestions)=>{
         this.setState( { suggestions } );
      } );
  }

  suggestionClick(e){
    this.props.onSelect();
  }

  // todo, decide what wrapper to use, searchAutoComplete or AutoComplete, don't need both
  renderList(suggestions){
    return (
      <div className="searchAutoComplete"> 
      { 
        suggestions.map( (suggestion)=>{
          return (
            <Link 
              key={suggestion.place_id}
              className="searchAutoComplete-item" 
              to={"/search/"+Helpers.toUrlFriendly(suggestion.description)+"/"+suggestion.place_id}
              onClick={this.suggestionClick.bind(this)}
            >
              {suggestion.description} <span className="distanceFromMe"></span>
            </Link>
          )
        }) 
      } 
      </div>
    );
  }

  render(){
    return (
      <div className="AutoComplete">
        {
          this.state.suggestions.length > 0 
            ? this.renderList(this.state.suggestions) 
            : ""
        }
      </div>
    );
  } 

}

export default SearchAutoComplete;
