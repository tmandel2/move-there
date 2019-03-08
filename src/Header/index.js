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
	goToUserPage = () => {
		this.props.history.push('/users');
	}
	render() {
		return(
			<div>
				<h1>THIS IS A HEADER</h1>
				<button onClick={this.goToAddresses}>See Addresses</button>
				{this.props.loggedIn ?
					<button onClick={this.goToUserPage}>Go to Profile</button>
					: null }
			</div>
		)
	}
}










export default withRouter(Header);