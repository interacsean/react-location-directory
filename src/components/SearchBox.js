import React, { Component } from "react";
import SearchAutoComplete  from "./SearchAutoComplete";
import PropTypes from "prop-types";
import DebounceInput from "react-debounce-input";

import './SearchBox.scss';

class SearchBox extends Component {

	static propTypes = {
		"searchTerm":  PropTypes.string,
	}

	static defaultProps = {
		"searchTerm": "",
	}

	constructor(props){
		super(props);

		/*
		 * Stores the state of the SearchBox's focus, and when not null, stores
		 * the id of timeout for cancellation 
		 */
		this.focusCancelDebounce = null;

		this.state = {
			searchTerm: (props.searchTerm ? props.searchTerm : ""),
			hasFocus: false,
		}
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.searchTerm){
			this.setState({searchTerm: nextProps.searchTerm});
		}
	}

	_updateSearch(e){
		this.setState({ searchTerm: e.target.value });
	}

	/**
	 * Manage the focus state of this object, in conjuction with lostFocus
	 *
	 * Sets the focus to true if focus is gained, cancels any deferred instructions 
	 * from the blur (lostFocus)
	 */
	_getsFocus(){
		this.setState({ hasFocus: true });
		if (this.focusCancelDebounce !== null){
			clearTimeout(this.focusCancelDebounce);
			this.focusCancelDebounce = null;
		}
	}

	/**
	 * Manage the focus state of this object, in conjuction with getsFocus
	 *
	 * Sets a small delay after a blur to allow the focus to be retained
	 */
	_lostFocus(){
		this.focusCancelDebounce = setTimeout(()=>{
			this.setState({ hasFocus: false });
		}, 100);
	}

	render() {
		return (
			<div 
				className="searchBox"
				onFocus={this._getsFocus.bind(this)}
                onBlur={this._lostFocus.bind(this)}
            >
        	{ /* This has a buggg, if you select the text and type-over, it clears it out */ }	
				<DebounceInput
					debounceTimeout={200} 
					minLength={3}
                    placeholder="Search for groups" 
                    value={this.state.searchTerm} 
                    onChange={this._updateSearch.bind(this)}
                />
				{ 
					( this.state.searchTerm !== "" && this.state.hasFocus )
						? <SearchAutoComplete
							searchTerm={this.state.searchTerm}
							onSelect={this._lostFocus.bind(this)}
						/>
						: ""
				}
			</div>
		); // /
	}

}

export default SearchBox;
