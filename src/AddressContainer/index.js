import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AddressShow from './AddressShow.js';
import NewAddress from './NewAddress.js';
import AddressIndex from './AddressIndex.js';

class AddressContainer extends Component {
	constructor(){
		super();

		this.state = {

		}
	}

	render() {
		return(
			<div>
				THIS IS AN AddressContainer
				<AddressShow currentAddress={this.props.currentAddress}/>
				---------------------------------------------------
				<NewAddress username={this.props.username} _id={this.props._id} />
				---------------------------------------------------
				<AddressIndex />
			</div>
		)
	}
}










export default withRouter(AddressContainer);