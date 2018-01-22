import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Location from '../services/Location';
// import Helpers from '../services/Helpers';

import './SearchBox.scss';

const renderSuggestion = suggestion => <span>{suggestion.description}</span>;

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: props.searchTerm || '',
      suggestions: [],
      isLoading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);

    this.debounceTimeout = null;
  }

  componentWillReceiveProps(props){    
    if (props.searchTerm !== this.state.searchTerm){
      this.setState({
        searchTerm: props.searchTerm
      })
    }
  }

  // When the search text is updated (via keyboard)
  onChange(event, { newValue }) {
    this.setState({
      searchTerm: newValue,
    });
  }

  // Also every time text is updated, except when the input value is empty
  // This could manage some debouncing
  onSuggestionsFetchRequested({ value }) {
    this.loadSuggestions(value);
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  // When an autocompleted item is selected
  getSuggestionValue(suggestionChosen) {
    this.props.onSearchTermSelected(suggestionChosen);

    return suggestionChosen.description;
  }

  loadSuggestions(value) {
    this.setState({
      isLoading: true,
    });

    Location.getSuggestions(value)
      .then((suggestions) => {
        this.setState({ isLoading: false, suggestions });
      });
  }

  render() {
    const inputProps = {
      placeholder: this.state.searchTerm || 'Search for locations near you',
      value: this.state.searchTerm,
      onChange: this.onChange,
    };

    return (
      <div className={this.props.className}>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

SearchBox.propTypes = {
  searchTerm: PropTypes.string,
  className: PropTypes.string,
  onSearchTermSelected: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  searchTerm: '',
  className: '',
};

export default SearchBox;
