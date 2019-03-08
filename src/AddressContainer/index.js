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
				{this.props.loggedIn ? 
					<NewAddress username={this.props.username} _id={this.props._id} />
					: null}
				---------------------------------------------------
				<AddressIndex showAddress={this.props.showAddress}/>
			</div>
		)
	}
}










export default withRouter(AddressContainer);