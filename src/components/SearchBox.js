import React, { Component } from "react";
// import SearchAutoComplete  from "./SearchAutoComplete";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import Location from "../services/Location";
import { withRouter } from 'react-router-dom';
import Helpers from '../services/Helpers';
// import debounceTimeoutounceInput from "react-debounce-input";

import "./SearchBox.scss";

class SearchBox extends Component {

  constructor(props){
    super(props);

    this.state = {
      searchTerm: (props.searchTerm ? props.searchTerm : ""),
      suggestions: [],
      isLoading: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);

  }

  getSuggestionValue(suggestionChosen){
    console.log(this);
    this.props.history.push("/search/"
      +Helpers.toUrlFriendly(suggestionChosen.description)
      +"/"+suggestionChosen.place_id);

    return suggestionChosen.description;
  }

  loadSuggestions(value) {
    
    this.setState({
      isLoading: true
    });
    
    Location.getSuggestions(value)
      .then( (suggestions)=>{
        console.log(suggestions);
         this.setState( { isLoading: false, suggestions } );
      } );

  }

  onChange(event, { newValue }) {
    this.setState({
      searchTerm: newValue
    });
  };
    
  onSuggestionsFetchRequested({ value }) {
    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.description}</span>
    );
  }

  render() {

    const inputProps = {
      placeholder: "Search for locations near you",
      value: this.state.searchTerm,
      onChange: this.onChange
    };

    return (
      <Autosuggest 
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} 
      />

    ); // /
  }

}

SearchBox.propTypes = {
  "searchTerm":  PropTypes.string,
}

SearchBox.defaultProps = {
  "searchTerm": "",
}

export default withRouter(SearchBox);
