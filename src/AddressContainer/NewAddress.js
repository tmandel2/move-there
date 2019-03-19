import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


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
			// biggest demographic divided by total pop. Lower is good.
			diversity: null,
			// House Cost divided by Average Income. Higher is bad.
			houseValue: null,

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
			// Call google geocode for lat and lon because some other apis need that information.
			const latLongResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.streetNumber}+${this.state.streetName.replace(/ /gi, '+')},+${this.state.city.replace(/ /gi, '+')},+${this.state.state}&key=${process.env.REACT_APP_GOOGLEKEY}`)

			const parsedLatLong = await latLongResponse.json();

			if(!latLongResponse.ok) {
				throw Error(latLongResponse.statusText);
			}
			// Get information regarding demographics at the zip code
			const zipInfoResponse = await fetch(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/GetZipCodeDetails/${this.state.zipCode}?key=${process.env.REACT_APP_ZIPCODEMYKEY}`)

			const parsedZipInfo = await zipInfoResponse.json();

			if(!zipInfoResponse.ok) {
				throw Error(zipInfoResponse.statusText);
			}
			// Build the api call for walk score. Needs to happen from server side due to walk score restrictions.
			const walkScoreResponse = await fetch(`${process.env.REACT_APP_ROUTE}addresses/walkscore`, {
				credentials: 'include',
				headers: {
					url: `http://api.walkscore.com/score?format=json&address=${this.state.streetNumber}%${this.state.streetName.replace(/ /gi, '%20')}%20${this.state.city.replace(/ /gi, '%20')}%20${this.state.state}%20${this.state.zipCode}&lat=${parsedLatLong.results[0].geometry.location.lat}&lon=${parsedLatLong.results[0].geometry.location.lng}&transit=1&bike=1&wsapikey=${process.env.REACT_APP_WALKSCOREKEY}`
				}
			})

			const parsedWalk = await walkScoreResponse.json();

			this.setState({
				latitude: parsedLatLong.results[0].geometry.location.lat,
				longitude: parsedLatLong.results[0].geometry.location.lng,
				houseValue: (parsedZipInfo.item.AverageHouseValue/parsedZipInfo.item.IncomePerHousehold),
				diversity: (Math.max.apply(null, 
					[
						parsedZipInfo.item.WhitePop,
						parsedZipInfo.item.BlackPop,
						parsedZipInfo.item.HispanicPop,
						parsedZipInfo.item.AsianPop,
						parsedZipInfo.item.IndianPop,
						parsedZipInfo.item.HawaiianPop,
						parsedZipInfo.item.OtherPop
					])/
					parsedZipInfo.item.ZipCodePopulation),
				medianAge: parsedZipInfo.item.MedianAge,
				walkScore: parsedWalk.walkscore
			});
			// Finally post to the server to put in the database. All the info needs to be returned before this happens
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

			await registerResponse.json();
			// Take you to your user page
			this.props.history.push('/users');

		} catch(err) {
			console.log(err);
		}
	}
// Only thing a user needs to enter is the address. The rest is handled by the system.
	render() {
		return (
			<div>
				<h2>NEW ADDRESS</h2>
				<form onSubmit={this.handleSubmit} className='new-address-form'>
					<input type='text' name='streetNumber' onChange={this.handleChange} placeholder='Enter Street Number' />
					<input type='text' name='streetName' onChange={this.handleChange} placeholder='Enter Street Name' />
					<input type='text' name='city' onChange={this.handleChange} placeholder='Enter City' />
					<label htmlFor='state-select'>Choose State</label>
					<select name='state' onChange={this.handleChange} id="state-select">
					    <option value="">--Please choose State--</option>
					    <option value="AL">Alabama</option>
					    <option value="AK">Alaska</option>
					    <option value="AZ">Arizona</option>
					    <option value="AR">Arkansas</option>
					    <option value="CA">California</option>
					    <option value="CO">Colorado</option>
					    <option value="CT">Connecticut</option>
					    <option value="DE">Delaware</option>
					    <option value="FL">Florida</option>
					    <option value="GA">Georgia</option>
					    <option value="HI">Hawaii</option>
					    <option value="ID">Idaho</option>
					    <option value="IL">Illinois</option>
					    <option value="IN">Indiana</option>
					    <option value="IA">Iowa</option>
					    <option value="KS">Kansas</option>
					    <option value="KY">Kentucky</option>
					    <option value="LA">Louisiana</option>
					    <option value="ME">Maine</option>
					    <option value="MD">Maryland</option>
					    <option value="MA">Massachusetts</option>
					    <option value="MI">Michigan</option>
					    <option value="MN">Minnesota</option>
					    <option value="MS">Mississippi</option>
					    <option value="MO">Missouri</option>
					    <option value="MT">Montana</option>
					    <option value="NE">Nebraska</option>
					    <option value="NV">Nevada</option>
					    <option value="NH">New Hampshire</option>
					    <option value="NJ">New Jersey</option>
					    <option value="NM">New Mexico</option>
					    <option value="NY">New York</option>
					    <option value="NC">North Carolina</option>
					    <option value="ND">North Dakota</option>
					    <option value="OH">Ohio</option>
					    <option value="OK">Oklahoma</option>
					    <option value="OR">Oregon</option>
					    <option value="PA">Pennsylvania</option>
					    <option value="RI">Rhode Island</option>
					    <option value="SC">South Carolina</option>
					    <option value="SD">South Dakota</option>
					    <option value="TN">Tennessee</option>
					    <option value="TX">Texas</option>
					    <option value="UT">Utah</option>
					    <option value="VT">Vermont</option>
					    <option value="VA">Virginia</option>
					    <option value="WA">Washington</option>
					    <option value="WV">West Virginia</option>
					    <option value="WI">Wisconsin</option>
					    <option value="WY">Wyoming</option>
					    <option value="DC">District of Columbia</option>
					</select>
					<input type='number' name='zipCode' onChange={this.handleChange} placeholder='Zip Code' />
					<button>Make Address</button>
				</form>
				<button onClick={() => this.props.history.push('/users')}>Cancel</button>
			</div>
		)
	}
}




export default withRouter(NewAddress);