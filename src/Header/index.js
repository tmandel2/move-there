import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';




class Header extends Component {
	constructor(){
		super();

		this.state = {

		}
	}
	goToAddresses = () => {
		this.props.showIndex();
		this.props.history.push('/addresses');
	}
	goToUserPage = () => {
		this.props.history.push('/users');
	}
	goToHome = () => {
		this.props.history.push('/');
	}
	render() {
		return(
			<header>
				<h1>Move There?</h1>
				<nav>
					<button onClick={this.goToAddresses}>See Addresses</button>
					{this.props.loggedIn ?
						<div>
							<button onClick={this.goToUserPage}>Go to Profile</button>
							<button onClick={this.props.logout}>Logout</button>
						</div>
						: null }
					<button onClick={this.goToHome}>Go Home Page</button>
				</nav>
			</header>
		)
	}
}










export default withRouter(Header);