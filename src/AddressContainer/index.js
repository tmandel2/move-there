import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AddressShow from './AddressShow.js';
import NewAddress from './NewAddress.js';
import AddressIndex from './AddressIndex.js';

class AddressContainer extends Component {
	constructor(){
		super();

		this.state = {
			index: false,
			show: true,
			new: false
		}
	}
	showShow = () => {
		this.setState({
			index: false,
			show: true,
			new: false
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
	render() {
		return(
			<div>
				<NewAddress username={this.props.username} _id={this.props._id} />
				{this.props.loggedIn ? 
					<button onClick={this.showNew}>Make a New Address</button>
					: null}
				{this.props.currentAddress.id ? 
					<AddressShow user={this.props.user} currentAddress={this.props.currentAddress} showAddress={this.props.showAddress} loggedIn={this.props.loggedIn}/>
					: <AddressIndex showAddress={this.props.showAddress} showShow={this.showShow}/>}
			</div>
		)
	}
}










export default withRouter(AddressContainer);