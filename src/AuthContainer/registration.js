import React, { Component } from 'react';

class Registration extends Component {
	constructor() {
		super();
		this.state = {
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
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(this.state.user);
			const registerResponse = await fetch(`${process.env.REACT_APP_ROUTE}auth/registration`, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if(!registerResponse.ok) {
				throw Error(registerResponse.statusText);
			}

			const parsedResponse = await registerResponse.json();


		} catch(err) {
			console.log(err);
		}
	}


	render() {
		return (
			<div>REGISTRATION
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='username' onChange={this.handleChange} placeholder='Enter Username' />
					<input type='text' name='email' onChange={this.handleChange} placeholder='Enter Email' />
					<input type='password' name='password' onChange={this.handleChange} placeholder='Enter Password' />
					<input type='number' name='currentZip' onChange={this.handleChange} placeholder='Current Zip'/>
					<input type='number' name='walkabilityImportance' onChange={this.handleChange} placeholder='Importance of Walkability' />
					<input type='number' name='medianDesiredAge' onChange={this.handleChange} placeholder='Desired Age of Neighbors' />
					<input type='number' name='medianAgeImportance' onChange={this.handleChange} placeholder='Importance of Neighbor Age' />
					<input type='number' name='diversityImportance' onChange={this.handleChange} placeholder='Importance of Diversity' />
					<input type='number' name='houseValueImportance' onChange={this.handleChange} placeholder='Importance of House Affordability' />
					<input type='number' name='desiredWeather' onChange={this.handleChange} placeholder='Desired Weather' />
					<input type='number' name='weatherImportance' onChange={this.handleChange} placeholder='Importance of Weather' />
					<input type='text' name='nearbyAmenities' onChange={this.handleChange} placeholder='What Do You Want To Live Near' />
					<input type='number' name='amenitiesImportance' onChange={this.handleChange} placeholder='Importance of Those Amenities' />
					<button>Register</button>
				</form>
			</div>
		)
	}
}

export default Registration;