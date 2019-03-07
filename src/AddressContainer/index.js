import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AddressShow from './AddressShow.js';

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
			</div>
		)
	}
}










export default withRouter(AddressContainer);