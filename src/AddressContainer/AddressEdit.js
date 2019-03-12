import React from 'react';
import { withRouter } from 'react-router-dom';



const AddressEdit = (props) => {

	return(
		<div>
			<h2>Edit Address</h2>
			<form onSubmit={props.handleEditSubmit} className='address-edit-form'>
				<input type='text' name='streetNumber' onChange={props.handleEditChange} value={props.addressToEdit.streetNumber} />
				<input type='text' name='streetName' onChange={props.handleEditChange} value={props.addressToEdit.streetName} />
				<input type='text' name='city' onChange={props.handleEditChange} value={props.addressToEdit.city} />
				<input type='text' name='state' onChange={props.handleEditChange} value={props.addressToEdit.state}/>
				<input type='number' name='zipCode' onChange={props.handleEditChange} value={props.addressToEdit.zipCode} />
				<button>Submit Edit</button>
			</form>
			<button onClick={() => props.showAddress(props.addressToEdit.id)}>Cancel Edit</button>
		</div>
	)

}

export default withRouter(AddressEdit);