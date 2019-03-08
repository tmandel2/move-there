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
					addresses: userParsed.addresses.sort((a, b) => {
						return a.id - b.id;
					})
				}
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}
	deleteAddress = async (identity, e) => {
		e.preventDefault();
		try {
			await fetch(`${process.env.REACT_APP_ROUTE}addresses/${identity}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			this.setState({
				user: {
					user: this.state.user.user,
					addresses: this.state.user.addresses.filter(address => address.id !== identity)
				}
			})
		} catch(err) {
			console.log(err);
		}
	}
	render() {
		const addressesList = this.state.user.addresses.map((address, i) => {
			if(address) {
				return <li key={i}>
					{address.streetNumber} {address.streetName}, {address.city}, {address.state} {address.zipCode}
					<button onClick={this.props.showAddress.bind(null, address.id)}>Show</button>
					<button onClick={this.deleteAddress.bind(null, address.id)}>Delete</button>
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