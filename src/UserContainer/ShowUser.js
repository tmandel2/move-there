// From index.js in usercontainer
import React from 'react';
import { withRouter } from 'react-router-dom';

const ShowUser = (props) => {
	// Gathers all of a users address, but also prevents an error from appearing if they don't have an address yet.
	const addressesList = props.user.addresses.map((address, i) => {
		if(address) {
			return <li key={i}>
				<div className='user-address-list'>
					{address.streetNumber} {address.streetName}, {address.city}, {address.state} {address.zipCode}
				</div>
				<div className='user-buttons'>
					<button onClick={props.showAddress.bind(null, address.id)}>Show</button>
					<button onClick={props.deleteAddress.bind(null, address.id)}>Delete</button>
				</div>
			</li>
		} else {
			return null
		}
	})
	return (
		<div className='user-page'>
			<ul className='user-addresses'>
				{addressesList}
			</ul>
		</div>
	)

}

export default withRouter(ShowUser);