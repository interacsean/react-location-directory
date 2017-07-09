import React from 'react'
import ReactDOM from 'react-dom'

class Search extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			searchTerm: ""
		}
		// this seems better
//		this.setState({keywords: ''});
	}

	updateSearch(e){
		this.setState({ searchTerm: e.target.value });
	}

	render() {
		return (
			<div>
				<input value={keywords} onChange={::this.updateSearch}/>
				{ 
					this.state.searchTerm !== "" ? 
						<SearchAutocomplete searchTerm={this.state.searchTerm}/> : 
						"" ;
				}
			</div>
		);
	}
}

class SearchAutocomplete extends React.Component {

	static propTypes = {
		suggestions: React.PropTypes.array
	}
	static defaultProps = {
		suggestions: []
	}

	constructor(props){
		super(props);

		this.state = {'suggestions': []};
	}

	componentWillReceiveProps(nextProps) {
		//doathing
	}

	_updateSuggestions(){
		var self=this;
		setTimeout(function(){
			self.setState('suggestions': ['a','b']);
		},500);
	}

	render(){
		return (
			<div>

			</div>
		)
	}
}

class Results extends React.Component {
	render(){ (<div>Results go here</div>) };
}

class Page extends React.Component {
	render() {
		return (
			<Search/>
			<Results/>
		)
	}
}

ReactDOM.render(<Page>, document.getElementById('pageRoot'));