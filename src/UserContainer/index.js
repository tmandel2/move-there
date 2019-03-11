import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EditUser from './EditUser.js';
import ShowUser from './ShowUser.js';

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
			},
			showEdit: false
			
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
			this.setState({
				showEdit: false
			})
			this.props.logIn(parsedResponse);

		} catch(err) {
			console.log(err);
		}
	}
	showEdit = () => {
		this.setState({
			showEdit: true
		})
	}
	undoEdit = () => {
		this.setState({
			showEdit: false
		})
	}
	deleteUser = async () => {
		try {
			await fetch(`${process.env.REACT_APP_ROUTE}users/${this.state.user.user.id}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			this.props.logout();
			// this.props.history.push('/');
		} catch(err) {
			console.log(err);
		}
	}
	render() {

		return (
			<div className='whole-user-page'>
				{this.props.loggedIn ? 
					<h2 className='user-name-head'>{this.state.user.user.username}</h2>
					: <h2>You Are Not Logged In</h2>}
				{this.state.showEdit ?
					<EditUser user={this.state.userToEdit} logIn={this.props.logIn} _id={this.props._id} handleChange={this.handleChange} handleSubmit={this.handleSubmit} undoEdit={this.undoEdit} deleteUser={this.deleteUser} />
					: 	<div className='edit-user-hid'>
							<ShowUser user={this.state.user} showAddress={this.props.showAddress} deleteAddress={this.deleteAddress} showEdit={this.showEdit} loggedIn={this.props.loggedIn}/>
							{this.props.loggedIn ?
								<button onClick={this.showEdit}>Edit User</button>
								: null}
						</div>
				}
			</div>
		)
	}
}


export default withRouter(UserContainer);