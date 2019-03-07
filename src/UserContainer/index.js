import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserContainer extends Component {
	constructor() {
		super();

		this.state = {
			user: {}
			
		}
	}
	componentDidMount() {
		this.getUser();
	}
	getUser = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_ROUTE}users/${this.props._id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const userParsed = await response.json();
			console.log(userParsed);
			this.setState({
				user: userParsed.user
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}
	render() {
		return (
			<div>User Container Found
			{this.state.user.username}
			</div>
		)
	}
}


export default withRouter(UserContainer);