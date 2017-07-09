import React, { Component } from "react";
import { Link } from "react-router-dom";

import Location from '../services/Location';
import Helpers from '../services/Helpers';

class SearchAutoComplete extends Component {

	static propTypes = {
		searchTerm: React.PropTypes.string
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

	render(){
		return (
			<div className="AutoComplete">
				{
					this.state.suggestions.length > 0 
						? this.renderList(this.state.suggestions) 
						: ""
				}
			</div>// /
		)
	} 

	suggestionClick(e){
		this.props.onSelect();
	}

	renderList(suggestions){
		return (<div className="searchAutoComplete"> { 
			suggestions.map( (suggestion)=>{
				return (
					<Link 
						key={suggestion.place_id}
						className="searchAutoComplete-item" 
						to={"/search/"+Helpers.toUrlFriendly(suggestion.description)+"/"+suggestion.place_id}
						onClick={this.suggestionClick.bind(this)}
					>
						{suggestion.description} <span></span>
					</Link>
				)
			}) } </div>
		);
	}

}

export default SearchAutoComplete;