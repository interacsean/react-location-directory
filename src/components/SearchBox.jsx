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
      searchTerm: (props.searchTerm ? props.searchTerm : ''),
      suggestions: [],
      isLoading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);

    this.debounceTimeout = null;
  }

  onChange(event, { newValue }) {
    this.setState({
      searchTerm: newValue,
    });
  }

  onSuggestionsFetchRequested({ value }) {
    this.loadSuggestions(value);
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  getSuggestionValue(suggestionChosen) {
    console.log(this.props);
    this.props.suggestionSelected(suggestionChosen);

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
      placeholder: 'Search for locations near you',
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
  suggestionSelected: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  searchTerm: '',
  className: '',
};

export default SearchBox;
