// Comes from index.js in the AddressContainer. The edits are handled there.
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
				<label htmlFor='state-select'>Choose State</label>
				<select name='state' onChange={props.handleEditChange} id="state-select">
				    <option value={props.addressToEdit.state}>--{props.addressToEdit.state}--</option>
				    <option value="AL">Alabama</option>
				    <option value="AK">Alaska</option>
				    <option value="AZ">Arizona</option>
				    <option value="AR">Arkansas</option>
				    <option value="CA">California</option>
				    <option value="CO">Colorado</option>
				    <option value="CT">Connecticut</option>
				    <option value="DE">Delaware</option>
				    <option value="FL">Florida</option>
				    <option value="GA">Georgia</option>
				    <option value="HI">Hawaii</option>
				    <option value="ID">Idaho</option>
				    <option value="IL">Illinois</option>
				    <option value="IN">Indiana</option>
				    <option value="IA">Iowa</option>
				    <option value="KS">Kansas</option>
				    <option value="KY">Kentucky</option>
				    <option value="LA">Louisiana</option>
				    <option value="ME">Maine</option>
				    <option value="MD">Maryland</option>
				    <option value="MA">Massachusetts</option>
				    <option value="MI">Michigan</option>
				    <option value="MN">Minnesota</option>
				    <option value="MS">Mississippi</option>
				    <option value="MO">Missouri</option>
				    <option value="MT">Montana</option>
				    <option value="NE">Nebraska</option>
				    <option value="NV">Nevada</option>
				    <option value="NH">New Hampshire</option>
				    <option value="NJ">New Jersey</option>
				    <option value="NM">New Mexico</option>
				    <option value="NY">New York</option>
				    <option value="NC">North Carolina</option>
				    <option value="ND">North Dakota</option>
				    <option value="OH">Ohio</option>
				    <option value="OK">Oklahoma</option>
				    <option value="OR">Oregon</option>
				    <option value="PA">Pennsylvania</option>
				    <option value="RI">Rhode Island</option>
				    <option value="SC">South Carolina</option>
				    <option value="SD">South Dakota</option>
				    <option value="TN">Tennessee</option>
				    <option value="TX">Texas</option>
				    <option value="UT">Utah</option>
				    <option value="VT">Vermont</option>
				    <option value="VA">Virginia</option>
				    <option value="WA">Washington</option>
				    <option value="WV">West Virginia</option>
				    <option value="WI">Wisconsin</option>
				    <option value="WY">Wyoming</option>
				    <option value="DC">District of Columbia</option>
				</select>
				<input type='number' name='zipCode' onChange={props.handleEditChange} value={props.addressToEdit.zipCode} />
				<button>Submit Edit</button>
			</form>
			<button onClick={() => props.showAddress(props.addressToEdit.id)}>Cancel Edit</button>
		</div>
	)

}

export default withRouter(AddressEdit);