import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class AddressShow extends Component {
	constructor() {
		super();
		this.state = {
			address: {}
		}
	}
	render() {
		return (
			<div>
				Address AdressShow
			</div>
		)
	}
}





export default withRouter(AddressShow);