import React, { Component } from 'react';

class Login extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
			message: ''
		}
	}
	handleChange = (e)=>{
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = async (e)=>{
		e.preventDefault();
		try{
			const loginResponse = await fetch(`${process.env.REACT_APP_ROUTE}auth/login`, {
				method: "POST",
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if(!loginResponse.ok){
				this.setState({
					message: "Incorrect username or password"
				})
				throw Error(loginResponse.statusText);
			}
			const parsed = await loginResponse.json();
			this.props.logIn(parsed);
			if(parsed){
				this.setState({
					message: ''
				})
			}
		}catch(err){
			console.log(err);
			return(err);
		}
	}
	render() {
		return (
			<div>LOGIN
				<form className="login-form" onSubmit={this.handleSubmit}>
					<input type="text" name="username" placeholder="Username" onChange={this.handleChange} className="login-input"/>
					<input type="password" name="password" placeholder="Password" onChange={this.handleChange} className="login-input"/>
					<button>Log In</button>
				</form>
			</div>
		)
	}
}

export default Login;