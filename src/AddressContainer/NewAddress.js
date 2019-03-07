import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import geocoder from 'google-geocoder';


class NewAddress extends Component {
	constructor() {
		super();

		this.state = {
			streetNumber: null,
			streetName: '',
			city: '',
			state: '',
			zipCode: null,
			latitude: null,
			longitude: null,
			walkScore: null,
			medianAge: null,
			diversity: null,
			houseValue: null
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
			const latLongResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.streetNumber}+${this.state.streetName},+${this.state.city},+${this.state.state}&key=${process.env.REACT_APP_GOOGLEKEY}`)

			const parsedLatLong = await latLongResponse.json();

			if(!latLongResponse.ok) {
				throw Error(latLongResponse.statusText);
			}

			await this.setState({
				latitude: parsedLatLong.results[0].geometry.location.lat,
				longitude: parsedLatLong.results[0].geometry.location.lng
			})

			const registerResponse = await fetch(`${process.env.REACT_APP_ROUTE}addresses`, {
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
			console.log(parsedResponse);
		} catch(err) {
			console.log(err);
		}
	}
	render() {
		return (
			<div>NEW ADDRESS
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='streetNumber' onChange={this.handleChange} placeholder='Enter Street Number' />
					<input type='text' name='streetName' onChange={this.handleChange} placeholder='Enter Street Name' />
					<input type='text' name='city' onChange={this.handleChange} placeholder='Enter City' />
					<input type='text' name='state' onChange={this.handleChange} placeholder='Enter State'/>
					<input type='number' name='zipCode' onChange={this.handleChange} placeholder='Zip Code' />
					<button>New Address</button>
				</form>
			</div>
		)
	}
}




export default withRouter(NewAddress);