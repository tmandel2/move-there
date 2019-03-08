import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';




class Header extends Component {
	constructor(){
		super();

		this.state = {

		}
	}
	goToAddresses = () => {
		this.props.history.push('/addresses');
	}
	render() {
		return(
			<div>
				<h1>THIS IS A HEADER</h1>
				<button onClick={this.goToAddresses}>See Addresses</button>
			</div>
		)
	}
}










export default withRouter(Header);