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
			index: false,
			show: true,
			new: false,
			addressToEdit: {}
		}
	}
	showShow = () => {
		this.setState({
			index: false,
			show: true,
			new: false
		})
	}
	showEdit = () => {
		this.setState({
			showEdit: true,
			showShow: false,
			addressToEdit: this.props.currentAddress
		})
	}
	showIndex = () => {
		this.setState({
			index: true,
			show: false,
			new: false
		})
	}
	showNew = () => {
		this.setState({
			index:false,
			show: false,
			new: true
		})
	}
	handleChange = (e) => {
		this.setState({
			addressToEdit: {
				...this.state.addressToEdit,
				[e.target.name]: e.target.value
			}
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const latLongResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.addressToEdit.streetNumber}+${this.state.addressToEdit.streetName.replace(/ /gi, '+')},+${this.state.addressToEdit.city.replace(/ /gi, '+')},+${this.state.addressToEdit.state}&key=${process.env.REACT_APP_GOOGLEKEY}`)

			const parsedLatLong = await latLongResponse.json();
			console.log(parsedLatLong, "lat long return");

			if(!latLongResponse.ok) {
				throw Error(latLongResponse.statusText);
			}

			const zipInfoResponse = await fetch(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/GetZipCodeDetails/${this.state.addressToEdit.zipCode}?key=${process.env.REACT_APP_ZIPCODETRIAL}`)

			const parsedZipInfo = await zipInfoResponse.json();
			console.log(parsedZipInfo, " Zip info response");

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
			console.log(parsedWalk, "Walk score return");

			this.setState({
				addressToEdit: {
					...this.state.addressToEdit,
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
				}
			});

			console.log(this.state.addressToEdit, "After state set");
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
		} catch(err) {
			console.log(err);
		}
	}
	render() {
		return(
			<div>
				<NewAddress username={this.props.username} _id={this.props._id} />
				{this.props.loggedIn ? 
					<button onClick={this.showNew}>Make a New Address</button>
					: null}
				{this.props.currentAddress.id && this.state.show ? 
					<AddressShow user={this.props.user} currentAddress={this.props.currentAddress} showAddress={this.props.showAddress} loggedIn={this.props.loggedIn} showEdit={this.showEdit} />
					: <AddressIndex showAddress={this.props.showAddress} showShow={this.showShow}/>}
				{this.state.showEdit ?
					<AddressEdit addressToEdit={this.state.addressToEdit} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
					: null}
			</div>
		)
	}
}










export default withRouter(AddressContainer);