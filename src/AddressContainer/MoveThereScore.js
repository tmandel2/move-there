import React from 'react';
import { withRouter } from 'react-router-dom';


const MoveThereScore = (props) => {
	let weather = '';
	if(props.user.desiredWeather === 3){
		weather = 'warmer'
	} else if(props.user.desiredWeather === 2){
		weather = 'the same'
	} else if(props.user.desiredWeather === 1){
		weather = 'colder'
	}
	return (
		<div>
			<ul>
				<li>Walkability is {props.currentAddress.walkScore}. Your importance was {props.user.walkabilityImportance}</li>
				<li>Median Age is {props.currentAddress.medianAge} compared to your desire for {props.user.medianDesiredAge}. Your importance was {props.user.medianAgeImportance}</li>
				<li>It has a diversity index of {props.currentAddress.diversity}. Your importance was {props.user.diversityImportance}</li>
				<li>Houses in the area are on average {props.currentAddress.houseValue} times the average income. Your importance was {props.user.houseValueImportance}</li>
				<li>You want the weather to be {weather}.</li>
			</ul>
		</div>
	)

}





export default withRouter(MoveThereScore);