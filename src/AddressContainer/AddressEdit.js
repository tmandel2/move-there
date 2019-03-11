import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';



class AddressEdit extends Component {
	constructor(){
		super();

		this.state = {
		}
	}
	render() {
		return(
			<div>Edit Address
				<form onSubmit={this.props.handleEditSubmit}>
					<input type='text' name='streetNumber' onChange={this.props.handleEditChange} value={this.props.addressToEdit.streetNumber} />
					<input type='text' name='streetName' onChange={this.props.handleEditChange} value={this.props.addressToEdit.streetName} />
					<input type='text' name='city' onChange={this.props.handleEditChange} value={this.props.addressToEdit.city} />
					<input type='text' name='state' onChange={this.props.handleEditChange} value={this.props.addressToEdit.state}/>
					<input type='number' name='zipCode' onChange={this.props.handleEditChange} value={this.props.addressToEdit.zipCode} />
					<button>Submit Edit</button>
				</form>
			</div>
		)
	}
}
export default withRouter(AddressEdit);