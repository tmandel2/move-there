import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Registration extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				username: '',
				password: '',
				email: '',
				currentZip: null,
				walkabilityImportance: null,
				medianDesiredAge: null,
				medianAgeImportance: null,
				diversityImportance: null,
				houseValueImportance: null,
				desiredWeather: null,
				weatherImportance: null,
				nearbyAmenities: '',
				amenitiesImportance: null
			},
			message: ''
		}
	}
	handleChange = (e) => {
		this.setState({
			user:{
				...this.state.user,
				[e.target.name]: e.target.value
			}
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const registerResponse = await fetch(`${process.env.REACT_APP_ROUTE}auth/registration`, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state.user),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if(!registerResponse.ok) {
				this.setState({
					message: 'Try a Different Username or Email'
				})
				throw Error(registerResponse.statusText);
			}

			const parsedResponse = await registerResponse.json();
			this.props.logIn(parsedResponse);
		} catch(err) {
			console.log(err);
		}
	}


	render() {
		return (
			<div>
				<h2>{this.state.message}</h2>
				<form onSubmit={this.handleSubmit} className='registration-form'>
					<input type='text' name='username' onChange={this.handleChange} placeholder='Enter Username' />
					<input type='text' name='email' onChange={this.handleChange} placeholder='Enter Email' />
					<input type='password' name='password' onChange={this.handleChange} placeholder='Enter Password' />
					<input type='number' name='currentZip' onChange={this.handleChange} placeholder='Current Zip'/>
					<input type='number' name='walkabilityImportance' min='1' max='5' onChange={this.handleChange} placeholder='Importance of Walkability' />
					<input type='number' name='medianDesiredAge' onChange={this.handleChange} placeholder='Desired Age of Neighbors' />
					<input type='number' name='medianAgeImportance' min='1' max='5' onChange={this.handleChange} placeholder='Importance of Neighbor Age' />
					<input type='number' name='diversityImportance' min='1' max='5' onChange={this.handleChange} placeholder='Importance of Diversity' />
					<input type='number' name='houseValueImportance' min='1' max='5' onChange={this.handleChange} placeholder='Importance of House Affordability' />
					<label htmlFor='desiredWeather'>Desired Weather: 1 for Colder, 2 for the Same, 3 for Warmer</label>
					<input type='number' name='desiredWeather' min='1' max='5' onChange={this.handleChange} placeholder='Desired Weather' />
					<input type='number' name='weatherImportance' min='1' max='5' onChange={this.handleChange} placeholder='Importance of Weather' />
					<input type='text' name='nearbyAmenities' onChange={this.handleChange} placeholder='What Do You Want To Live Near' />
					<input type='number' name='amenitiesImportance' min='1' max='5' onChange={this.handleChange} placeholder='Importance of Those Amenities' />
					<button>Register</button>
				</form>
				<button onClick={this.props.hideReg}>Already Registered?</button>
			</div>
		)
	}
}

export default withRouter(Registration);