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
			const latLongResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.streetNumber}+${this.state.streetName.replace(/ /gi, '+')},+${this.state.city.replace(/ /gi, '+')},+${this.state.state}&key=${process.env.REACT_APP_GOOGLEKEY}`)

			const parsedLatLong = await latLongResponse.json();

			if(!latLongResponse.ok) {
				throw Error(latLongResponse.statusText);
			}

			const zipInfoResponse = await fetch(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/GetZipCodeDetails/${this.state.zipCode}?key=${process.env.REACT_APP_ZIPCODETRIAL}`)

			const parsedZipInfo = await zipInfoResponse.json();

			if(!zipInfoResponse.ok) {
				throw Error(zipInfoResponse.statusText);
			}

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

			this.props.history.push('/users');

		} catch(err) {
			console.log(err);
		}
	}
	render() {
		return (
			<div>
				<h2>NEW ADDRESS</h2>
				<form onSubmit={this.handleSubmit} className='new-address-form'>
					<input type='text' name='streetNumber' onChange={this.handleChange} placeholder='Enter Street Number' />
					<input type='text' name='streetName' onChange={this.handleChange} placeholder='Enter Street Name' />
					<input type='text' name='city' onChange={this.handleChange} placeholder='Enter City' />
					<input type='text' name='state' onChange={this.handleChange} placeholder='Enter State'/>
					<input type='number' name='zipCode' onChange={this.handleChange} placeholder='Zip Code' />
					<button>Make Address</button>
				</form>
				<button onClick={() => this.props.history.push('/users')}>Cancel</button>
			</div>
		)
	}
}




export default withRouter(NewAddress);