import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';




class AddressIndex extends Component {
	constructor(){
		super();

		this.state = {
			addresses: []
		}
	}
	componentDidMount() {
		this.getAddresses();
	}
	getAddresses = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_ROUTE}addresses`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const addressesParsed = await response.json();
			this.setState({
				addresses: addressesParsed
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}
	render() {
		const addressesList = this.state.addresses.map((address, i) => {
			if(address) {
				return <li key={i}>
					{address.streetNumber} {address.streetName}, {address.city}, {address.state} {address.zipCode}
					<button onClick={this.props.showAddress.bind(null, address.id)}>Show</button>
				</li>
			} else {
				return null
			}
		})
		return(
			<div>
				<h2 className='address-index-title'>All Entered Addresses</h2>
				<ul className='all-addresses'>
					{addressesList}
				</ul>
			</div>
		)
	}
}





export default withRouter(AddressIndex);