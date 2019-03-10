import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EditUser from './EditUser.js';

class UserContainer extends Component {
	constructor() {
		super();

		this.state = {
			user: {
				user: {},
				addresses: []
			},
			userToEdit: {
				user: {}
			}
			
		}
	}
	componentDidMount() {
		this.props.loggedIn ?
			this.getUser()
			: this.render()
		
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
				},
				userToEdit: {
					user: userParsed.user
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
	handleChange = (e) => {
		this.setState({
			userToEdit: {
				user: {
					...this.state.userToEdit.user,
					[e.target.name]: e.target.value
				}
			}
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(this.state.userToEdit.user);
			const editResponse = await fetch(`${process.env.REACT_APP_ROUTE}users/${this.props._id}`, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.userToEdit.user),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if(!editResponse.ok) {
				throw Error(editResponse.statusText);
			}

			const parsedResponse = await editResponse.json();
			this.props.logIn(parsedResponse);
			// this.props.history.push('/users');

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
		console.log(this.state.user);
		return (
			<div>
				{this.props.loggedIn ? 
					this.state.user.user.username
					: 'You Are Not Logged In'}
				{addressesList}
				{this.state.user.user.username ?
					<EditUser user={this.state.userToEdit} logIn={this.props.logIn} _id={this.props._id} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
					: null 
				}
			</div>
		)
	}
}


export default withRouter(UserContainer);