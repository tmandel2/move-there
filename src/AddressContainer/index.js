import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AddressShow from './AddressShow.js';
import NewAddress from './NewAddress.js';
import AddressIndex from './AddressIndex.js';
import AddressEdit from './AddressEdit.js';

class AddressContainer extends Component {
	constructor(){
		super();

		this.state = {
			showEdit: false,
			show: true,
			addressToEdit: {},
		}
	}
	showEdit = () => {
		this.props.showEditAddress();
		this.setState({
			addressToEdit: this.props.currentAddress
		})
	}
	handleEditChange = (e) => {
		this.setState({
			addressToEdit: {
				...this.state.addressToEdit,
				[e.target.name]: e.target.value
			}
		})
	}
	// Runs the same checks that happen when a new address is made. This and New Address are the only times these APIs need to be called to load the database. Reduces stress on API keys.
	handleEditSubmit = async (e) => {
		e.preventDefault();
		try {
			const latLongResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.addressToEdit.streetNumber}+${this.state.addressToEdit.streetName.replace(/ /gi, '+')},+${this.state.addressToEdit.city.replace(/ /gi, '+')},+${this.state.addressToEdit.state}&key=${process.env.REACT_APP_GOOGLEKEY}`)

			const parsedLatLong = await latLongResponse.json();

			if(!latLongResponse.ok) {
				throw Error(latLongResponse.statusText);
			}

			const zipInfoResponse = await fetch(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/GetZipCodeDetails/${this.state.addressToEdit.zipCode}?key=${process.env.REACT_APP_ZIPCODEMYKEY}`)

			const parsedZipInfo = await zipInfoResponse.json();

			if(!zipInfoResponse.ok) {
				throw Error(zipInfoResponse.statusText);
			}

			const walkScoreResponse = await fetch(`${process.env.REACT_APP_ROUTE}addresses/walkscore`, {
				credentials: 'include',
				headers: {
					url: `http://api.walkscore.com/score?format=json&address=${this.state.addressToEdit.streetNumber}%${this.state.addressToEdit.streetName.replace(/ /gi, '%20')}%20${this.state.addressToEdit.city.replace(/ /gi, '%20')}%20${this.state.addressToEdit.state}%20${this.state.addressToEdit.zipCode}&lat=${parsedLatLong.results[0].geometry.location.lat}&lon=${parsedLatLong.results[0].geometry.location.lng}&transit=1&bike=1&wsapikey=${process.env.REACT_APP_WALKSCOREKEY}`
				}
			})

			const parsedWalk = await walkScoreResponse.json();

			this.setState({
				addressToEdit: {
					...this.state.addressToEdit,
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
						])/parsedZipInfo.item.ZipCodePopulation),
					medianAge: parsedZipInfo.item.MedianAge,
					walkScore: parsedWalk.walkscore
				}
			});
			// Make the call to the database once all the api calls have returned.
			const editResponse = await fetch(`${process.env.REACT_APP_ROUTE}addresses/${this.state.addressToEdit.id}`, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.addressToEdit),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if(!editResponse.ok) {
				throw Error(editResponse.statusText);
			}

			const parsedResponse = await editResponse.json();
			console.log(parsedResponse);
			this.props.updateAddress(parsedResponse);
			this.props.showAddress(parsedResponse.id);

		} catch(err) {
			console.log(err);
		}
	}
	render() {
		return(
			<div>
				{this.props.newAddress ? 
					<NewAddress username={this.props.username} _id={this.props._id} showAddress={this.props.showAddress} updateAddress={this.props.updateAddress} history={this.props.history} />
					: null
				}
				{this.props.currentAddress.id ? 
					<div>
						{this.props.showEdit ?
							<AddressEdit addressToEdit={this.state.addressToEdit} handleEditChange={this.handleEditChange} handleEditSubmit={this.handleEditSubmit} showAddress={this.props.showAddress}/>
							: <div>
								{this.props.showAddressScreen ?
									<AddressShow user={this.props.user} currentAddress={this.props.currentAddress} loggedIn={this.props.loggedIn} showEdit={this.showEdit} />
									: null
								}
							</div>
						}
					</div>
					: null
				}
				{this.props.addressIndex ?
					<AddressIndex showAddress={this.props.showAddress} />
					: null
				}
			</div>
		)
	}
}










export default withRouter(AddressContainer);