import React, { Component } from "react";
import SearchAutoComplete  from "./SearchAutoComplete";
import DebounceInput from 'react-debounce-input';

import './SearchBox.scss';

class SearchBox extends Component {

	constructor(props){
		super(props);

		this.focusCancelDebounce = null;

		this.state = {
			searchTerm: (props.searchTerm ? props.searchTerm : ""),
			hasFocus: false
		}
		// this seems better
//		this.setState({keywords: ''});
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.searchTerm){
			this.setState({searchTerm: nextProps.searchTerm});
		}
	}

	updateSearch(e){
		this.setState({ searchTerm: e.target.value });
	}

	/**
	 * Manage the focus state of this object, in conjuction with lostFocus
	 *
	 * Sets the focus to true if focus is gained, cancels any deferred instructions 
	 * from the blur (lostFocus)
	 */
	getsFocus(){
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
	lostFocus(){
		this.focusCancelDebounce = setTimeout(()=>{
			this.setState({ hasFocus: false });
		}, 100);
	}

	render() {
		return (
			<div 
				className="searchBox"
				onFocus={this.getsFocus.bind(this)}
                onBlur={this.lostFocus.bind(this)}
            >
        	{ /* This has a buggg, if you select the text and type-over, it clears it out */ }	
				<DebounceInput
					debounceTimeout={200} 
					minLength={3}
                    placeholder="Search for NMMNG Groups" 
                    value={this.state.searchTerm} 
                    onChange={this.updateSearch.bind(this)}
                />
				{ 
					this.state.searchTerm !== "" && this.state.hasFocus
						? <SearchAutoComplete
							searchTerm={this.state.searchTerm}
							onSelect={this.lostFocus.bind(this)}
						/>
						: ""
				}
			</div>
		);
	}

}

export default SearchBox