import React, { Component } from 'react';
import Login from './login.js';
import Registration from './registration.js';
import { withRouter } from 'react-router-dom';

class AuthContainer extends Component {
	constructor() {
		super();

		this.state = {
			showRegistration: false
		}
	}
	showReg = () => {
		this.setState({
			showRegistration: true
		})
	}
	hideReg = () => {
		this.setState({
			showRegistration: false
		})
	}
	render() {
		return (
			<div>Authocontainer
				{this.state.showRegistration ? 
					<Registration logIn={this.props.logIn} hideReg={this.hideReg} history={this.props.history}/> : 
					<Login logIn={this.props.logIn} showReg={this.showReg} history={this.props.history}/>
				}
			</div>
		)
	}
}


export default withRouter(AuthContainer);