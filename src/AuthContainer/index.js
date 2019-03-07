import React, { Component } from 'react';
import Login from './login.js';
import Registration from './registration.js';

class AuthContainer extends Component {
	constructor() {
		super();

		this.state = {

		}
	}
	render() {
		return (
			<div>Authocontainer
				<Login />
				<Registration />
			</div>
		)
	}
}


export default AuthContainer;