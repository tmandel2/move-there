import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditUser extends Component {

	constructor() {
		super();
		this.state = {
		}
	}
	render() {
		console.log('PROPPPPS', this.props.user);
		return (
			<form onSubmit={this.props.handleSubmit}>
				<input type='text' name='username' onChange={this.props.handleChange} value={this.props.user.user.username} />
				<input type='text' name='email' onChange={this.props.handleChange} value={this.props.user.user.email} />
				<input type='password' name='password' onChange={this.props.handleChange} value={this.props.user.user.password} />
				<input type='number' name='currentZip' onChange={this.props.handleChange} value={this.props.user.user.currentZip}/>
				<input type='number' name='walkabilityImportance' onChange={this.props.handleChange} value={this.props.user.user.walkabilityImportance} />
				<input type='number' name='medianDesiredAge' onChange={this.props.handleChange} value={this.props.user.user.medianDesiredAge} />
				<input type='number' name='medianAgeImportance' onChange={this.props.handleChange} value={this.props.user.user.medianAgeImportance} />
				<input type='number' name='diversityImportance' onChange={this.props.handleChange} value={this.props.user.user.diversityImportance} />
				<input type='number' name='houseValueImportance' onChange={this.props.handleChange} value={this.props.user.user.houseValueImportance} />
				<input type='number' name='desiredWeather' onChange={this.props.handleChange} value={this.props.user.user.desiredWeather} />
				<input type='number' name='weatherImportance' onChange={this.props.handleChange} value={this.props.user.user.weatherImportance} />
				<input type='text' name='nearbyAmenities' onChange={this.props.handleChange} value={this.props.user.user.nearbyAmenities} />
				<input type='number' name='amenitiesImportance' onChange={this.props.handleChange} value={this.props.user.user.amenitiesImportance} />
				<button>Edit User</button>
			</form>
		)
	}
}

export default withRouter(EditUser);