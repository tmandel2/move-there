import React from 'react';
import { withRouter } from 'react-router-dom';

const ShowUser = (props) => {
	const addressesList = props.user.addresses.map((address, i) => {
		if(address) {
			return <li key={i}>
				{address.streetNumber} {address.streetName}, {address.city}, {address.state} {address.zipCode}
				<button onClick={props.showAddress.bind(null, address.id)}>Show</button>
				<button onClick={props.deleteAddress.bind(null, address.id)}>Delete</button>
			</li>
		} else {
			return null
		}
	})
	return (
		<div>
			{addressesList}
			{props.loggedIn ?
				<button onClick={props.showEdit}>Edit User</button>
				: null}
		</div>
	)

}

export default withRouter(ShowUser);