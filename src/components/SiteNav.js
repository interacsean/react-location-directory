import React, { Component } from "react";

import { Link } from "react-router-dom";


class SiteNav extends Component {

	render(){
		return (
			<div className="siteNav">
				<Link to='/about'>About</Link> | <Link to="/start">Start</Link> | <Link to="/manage">Manage</Link>
			</div>
		)
	}
}

export default SiteNav;