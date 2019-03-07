import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AddressShow from './AddressShow.js';
import NewAddress from './NewAddress.js';

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
				<AddressShow />
				<NewAddress username={this.props.username} _id={this.props._id} />
			</div>
		)
	}
}










export default withRouter(AddressContainer);