import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class AddressShow extends Component {
	constructor() {
		super();
		this.state = {
		}
	}
	componentDidMount() {
		this.getAddress();
	}
	getAddress = () => {

	}
	render() {
		return (
			<div>
				Address AdressShow
				{this.props.currentAddress.id} {this.props.currentAddress.walkScore}{this.props.currentAddress.streetNumber} {this.props.currentAddress.streetName}, {this.props.currentAddress.city}, {this.props.currentAddress.state} {this.props.currentAddress.zipCode}
			</div>
		)
	}
}





export default withRouter(AddressShow);