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
			new: false,
			addressToEdit: {},
		}
	}
	showShow = () => {
		this.setState({
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
	showNew = () => {
		this.setState({
			show: false,
			new: true
		})
	}
	showIndex = () => {
		this.setState({
			new: false,
			showEdit: false,
			showShow: false
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
	handleEditSubmit = async (e) => {
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

			this.props.updateAddress(parsedResponse);
			this.setState({
				showEdit: false
			})
		} catch(err) {
			console.log(err);
		}
	}
	render() {
		return(
			<div>
				
				{this.props.loggedIn ? 
					<div> 
						{this.props.newAddress ?
							<NewAddress username={this.props.username} _id={this.props._id} showAddress={this.props.showAddress} updateAddress={this.props.updateAddress} showShow={this.showShow} />
							: null }
					</div>
					: null}
				{this.props.currentAddress.id ? 
					<div>
						{this.state.showEdit ?
							<AddressEdit addressToEdit={this.state.addressToEdit} handleEditChange={this.handleEditChange} handleEditSubmit={this.handleEditSubmit}/>
							: <div>
								{this.state.show ?
									<AddressShow user={this.props.user} currentAddress={this.props.currentAddress} showAddress={this.props.showAddress} loggedIn={this.props.loggedIn} showEdit={this.showEdit} />
									: <AddressIndex showAddress={this.props.showAddress} showShow={this.showShow}/>
								}
							</div>
						}
					</div>
					: null }
				{this.props.addressIndex ?
					<AddressIndex showAddress={this.props.showAddress} showShow={this.showShow}/>
					: null }
			</div>
		)
	}
}










export default withRouter(AddressContainer);