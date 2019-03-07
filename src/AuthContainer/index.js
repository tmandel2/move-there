import React, { Component } from 'react';
import Login from './login.js';
// import Register from '../Register';

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
			</div>
		)
	}
}


export default AuthContainer;