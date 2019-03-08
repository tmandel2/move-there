import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';




class Header extends Component {
	constructor(){
		super();

		this.state = {

		}
	}
	render() {
		return(
			<div>
				<h1>THIS IS A HEADER</h1>
			</div>
		)
	}
}










export default withRouter(Header);