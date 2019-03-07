import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserContainer extends Component {
	constructor() {
		super();

		this.state = {
			user: {
				user: {},
				addresses: []
			}
			
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
				user: {
					user: userParsed.user,
					addresses: userParsed.addresses
				}
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}
	render() {
		const addressesList = this.state.user.addresses.map((address, i) => {
			if(address) {
				return <li key={i}>
					{address.zipCode}
				</li>
			} else {
				return null
			}
		})
		return (
			<div>User Container Found
			{this.state.user.user.username}
			{addressesList}
			</div>
		)
	}
}


export default withRouter(UserContainer);