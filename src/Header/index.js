// In the app.js
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


// No state, but this has a lot of redirect functions for navigating from every page

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
	showNewAddress = () => {
		this.props.showNewAddress();
	}
	render() {
		return(
			<header>
				<div className="social-media">
					<a href="https://www.linkedin.com/in/timothy-mandel" className="fa fa-linkedin icon" id="linkedin" target='_blank' rel='noopener noreferrer'> </a>
					<a href="https://www.github.com/tmandel2" className="fa fa-github icon" id="github" target='_blank' rel='noopener noreferrer'> </a>
				</div>
				<h1 id='move-there-header'>Move There?</h1>
				<nav>
					<button onClick={this.goToAddresses}>See All Addresses</button>
					{this.props.loggedIn ?
						<div>
							<button onClick={this.goToUserPage}>Go to Profile</button>
							<button onClick={this.props.logout}>Logout</button>
							<button onClick={this.showNewAddress}>New Address</button>
						</div>
						: <button onClick={this.goToHome}>Login or Register</button>}
				</nav>
			</header>
		)
	}
}










export default withRouter(Header);