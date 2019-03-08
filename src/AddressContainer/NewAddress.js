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
			// Total population divided by the biggest demographic. Higher is good.
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
			console.log(parsedLatLong, "lat long return");

			if(!latLongResponse.ok) {
				throw Error(latLongResponse.statusText);
			}

			const zipInfoResponse = await fetch(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/GetZipCodeDetails/${this.state.zipCode}?key=${process.env.REACT_APP_ZIPCODETRIAL}`)

			const parsedZipInfo = await zipInfoResponse.json();
			console.log(parsedZipInfo, " Zip info response");

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
			console.log(parsedWalk, "Walk score return");

			this.setState({
				latitude: parsedLatLong.results[0].geometry.location.lat,
				longitude: parsedLatLong.results[0].geometry.location.lng,
				houseValue: (parsedZipInfo.item.AverageHouseValue/parsedZipInfo.item.IncomePerHousehold),
				diversity: (parsedZipInfo.item.ZipCodePopulation/Math.max.apply(null, 
					[
						parsedZipInfo.item.WhitePop,
						parsedZipInfo.item.BlackPop,
						parsedZipInfo.item.HispanicPop,
						parsedZipInfo.item.AsianPop,
						parsedZipInfo.item.IndianPop,
						parsedZipInfo.item.HawaiianPop,
						parsedZipInfo.item.OtherPop
					])),
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

			const parsedResponse = await registerResponse.json();
			console.log(parsedResponse, " what comes back from adding");
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