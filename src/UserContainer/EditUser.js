import React from 'react';
import { withRouter } from 'react-router-dom';

const EditUser = (props) => {

	return (
		<div>
			<form onSubmit={props.handleSubmit} className='registration-form'>
				<div className='username'>
					<label htmlFor='username'>Username</label>
					<input type='text' className='input-words' name='username' onChange={props.handleChange} value={props.user.user.username} />
				</div>
				<div className='email'>
					<label htmlFor='email'>Email</label>
					<input type='email' className='input-words' name='email' onChange={props.handleChange} value={props.user.user.email} />
				</div>
				<div className='password'>
					<label htmlFor='password'>Password</label>
					<input type='password' className='input-words' name='password' onChange={props.handleChange} value={props.user.user.password} />
				</div>
				<div  className='currentZip'>
					<label htmlFor='currentZip'>Zip Code</label>
					<input type='number' className='input-words' name='currentZip' onChange={props.handleChange} value={props.user.user.currentZip}/>
				</div>
				<div className='walkabilityImportance'>
					<label htmlFor='walkabilityImportance'>Importance of Walkability</label>
					<input type='number' className='input-numbers' name='walkabilityImportance' min='1' max='5' onChange={props.handleChange} value={props.user.user.walkabilityImportance} />
				</div>
				<div className='medianDesiredAge'>
					<label htmlFor='medianDesiredAge'>Desired Median Age</label>
					<input type='number' className='input-words' name='medianDesiredAge' onChange={props.handleChange} value={props.user.user.medianDesiredAge} />
				</div>
				<div className='medianAgeImportance'>
					<label htmlFor='medianAgeImportance'>Importance of Neighborhood Age</label>
					<input type='number' className='input-numbers' name='medianAgeImportance' min='1' max='5' onChange={props.handleChange} value={props.user.user.medianAgeImportance} />
				</div>
				<div className='diversityImportance'>
					<label htmlFor='diversityImportance'>Importance of Diversity</label>
					<input type='number' className='input-numbers' name='diversityImportance' min='1' max='5' onChange={props.handleChange} value={props.user.user.diversityImportance} />
				</div>
				<div className='houseValueImportance'>
					<label htmlFor='houseValueImportance'>Importance of House Costs to Income</label>
					<input type='number' className='input-numbers' name='houseValueImportance' min='1' max='5' onChange={props.handleChange} value={props.user.user.houseValueImportance} />
				</div>
				<div className='desiredWeather'>
					<label htmlFor='desiredWeather'>Desired Weather: 1 for Colder, 2 for the Same, 3 for Warmer</label>
					<input type='number' className='input-numbers' name='desiredWeather' onChange={props.handleChange} value={props.user.user.desiredWeather} />
				</div>
				<div className='weatherImportance'>
					<label htmlFor='weatherImportance'>Importance of Weather</label>
					<input type='number' className='input-numbers' name='weatherImportance' min='1' max='5' onChange={props.handleChange} value={props.user.user.weatherImportance} />
				</div>
				<div className='nearbyAmenities'>
					<label htmlFor='nearbyAmenities'>Important Things Nearby</label>
					<input type='text' className='input-words' name='nearbyAmenities' min='1' max='5' onChange={props.handleChange} value={props.user.user.nearbyAmenities} />
				</div>
				<div className='amenitiesImportance'>
					<label htmlFor='amenitiesImportance'>Importance of Those Things</label>
					<input type='number' className='input-numbers' name='amenitiesImportance' min='1' max='5' onChange={props.handleChange} value={props.user.user.amenitiesImportance} />
				</div>
				<button>Edit User</button>
			</form>
			<button onClick={props.deleteUser}>DELETE USER</button>
			<button onClick={props.undoEdit}>Undo Edit</button>
		</div>
	)

}

export default withRouter(EditUser);