import React from 'react';
import { withRouter } from 'react-router-dom';



const AddressEdit = (props) => {

	return(
		<div>Edit Address
			<form onSubmit={props.handleEditSubmit}>
				<input type='text' name='streetNumber' onChange={props.handleEditChange} value={props.addressToEdit.streetNumber} />
				<input type='text' name='streetName' onChange={props.handleEditChange} value={props.addressToEdit.streetName} />
				<input type='text' name='city' onChange={props.handleEditChange} value={props.addressToEdit.city} />
				<input type='text' name='state' onChange={props.handleEditChange} value={props.addressToEdit.state}/>
				<input type='number' name='zipCode' onChange={props.handleEditChange} value={props.addressToEdit.zipCode} />
				<button>Submit Edit</button>
			</form>
		</div>
	)

}

export default withRouter(AddressEdit);