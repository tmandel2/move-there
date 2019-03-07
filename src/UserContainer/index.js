import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserContainer extends Component {
	constructor() {
		super();

		this.state = {
			
		}
	}
	render() {
		return (
			<div>User Container Found
			</div>
		)
	}
}


export default withRouter(UserContainer);