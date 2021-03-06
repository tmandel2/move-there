// In the authcontainer and connects to the index.js
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

	// Message will only be produced if there is an issue with the username/email attempt
	render() {
		return (
			<div>
				<h2>{this.state.message}</h2>
				<form onSubmit={this.handleSubmit} className='registration-form'>
					<div className='username'>
						<label htmlFor='username'>Username</label>
						<input type='text' className='input-words' name='username' onChange={this.handleChange} placeholder='Enter Username' />
					</div>
					<div className='email'>
						<label htmlFor='email'>Email</label>
						<input type='email' className='input-words' name='email' onChange={this.handleChange} placeholder='Enter Email' />
					</div>
					<div className='password'>
						<label htmlFor='password'>Password</label>
						<input type='password' className='input-words' name='password' onChange={this.handleChange} placeholder='Enter Password' />
					</div>
					<div  className='currentZip'>
						<label htmlFor='currentZip'>Zip Code</label>
						<input type='number' className='input-words' name='currentZip' onChange={this.handleChange} placeholder='Current Zip' />
					</div>
					<div className='walkabilityImportance'>
						<label htmlFor='walkabilityImportance'>Importance of Walkability</label>
						<input type='number' className='input-numbers' name='walkabilityImportance' min='1' max='5' onChange={this.handleChange} placeholder='1 - 5' />
					</div>
					<div className='medianDesiredAge'>
						<label htmlFor='medianDesiredAge'>Desired Median Age</label>
						<input type='number' className='input-words' name='medianDesiredAge' onChange={this.handleChange} placeholder='Desired Age of Neighbors' />
					</div>
					<div className='medianAgeImportance'>
						<label htmlFor='medianAgeImportance'>Importance of Neighborhood Age</label>
						<input type='number' className='input-numbers' name='medianAgeImportance' min='1' max='5' onChange={this.handleChange} placeholder='1 - 5' />
					</div>
					<div className='diversityImportance'>
						<label htmlFor='diversityImportance'>Importance of Diversity</label>
						<input type='number' className='input-numbers' name='diversityImportance' min='1' max='5' onChange={this.handleChange} placeholder='1 - 5' />
					</div>
					<div className='houseValueImportance'>
						<label htmlFor='houseValueImportance'>Importance of House Costs to Income</label>
						<input type='number' className='input-numbers' name='houseValueImportance' min='1' max='5' onChange={this.handleChange} placeholder='1 - 5' />
					</div>
					<div className='desiredWeather'>
						<label htmlFor='desiredWeather'>Desired Weather: 1 for Colder, 2 for the Same, 3 for Warmer</label>
						<input type='number' className='input-numbers' name='desiredWeather' onChange={this.handleChange} placeholder='1, 2, or 3' />
					</div>
					<div className='weatherImportance'>
						<label htmlFor='weatherImportance'>Importance of Weather</label>
						<input type='number' className='input-numbers' name='weatherImportance' min='1' max='5' onChange={this.handleChange} placeholder='1 - 5' />
					</div>
					<div className='nearbyAmenities'>
						<label htmlFor='nearbyAmenities'>Important Things Nearby</label>
						<input type='text' className='input-words' name='nearbyAmenities' min='1' max='5' onChange={this.handleChange} placeholder='What Do You Want To Live Near' />
					</div>
					<div className='amenitiesImportance'>
						<label htmlFor='amenitiesImportance'>Importance of Those Things</label>
						<input type='number' className='input-numbers' name='amenitiesImportance' min='1' max='5' onChange={this.handleChange} placeholder='1 - 5' />
					</div>
					<button>Register</button>
				</form>
				<button onClick={this.props.hideReg}>Already Registered?</button>
			</div>
		)
	}
}

export default withRouter(Registration);