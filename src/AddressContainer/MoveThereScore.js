import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class MoveThereScore extends Component {
	constructor() {
		super();
		this.state={
			walkSuccess: false,
			ageSuccess: false,
			diversitySuccess: false,
			houseValueSuccess: false,
			weatherSuccess: false
		}
	}
	componentDidMount(){
		this.calculateWalk();
		this.calculateAge();
		this.calculateHouseValue();
		this.calculateDiversity();
		this.calculateWeather();
	}
	calculateWalk = () => {
		if(
			(this.props.currentAddress.walkScore > 90 && this.props.user.walkabilityImportance <= 5)
			|| (this.props.currentAddress.walkScore > 80 && this.props.user.walkabilityImportance <= 4)
			|| (this.props.currentAddress.walkScore > 60 && this.props.user.walkabilityImportance <= 3)
			|| (this.props.currentAddress.walkScore > 40 && this.props.user.walkabilityImportance <= 2)
			|| (this.props.currentAddress.walkScore > 20 && this.props.user.walkabilityImportance === 1)
		){
			this.setState({
				walkSuccess: true
			})
		}
	}
	calculateAge = () => {
		if((Math.abs(this.props.currentAddress.medianAge - this.props.user.medianDesiredAge) <= 5 && this.props.user.medianAgeImportance <= 5)
			|| (Math.abs(this.props.currentAddress.medianAge - this.props.user.medianDesiredAge) <= 8 && this.props.user.medianAgeImportance <= 4)
			|| (Math.abs(this.props.currentAddress.medianAge - this.props.user.medianDesiredAge) <= 12 && this.props.user.medianAgeImportance <= 3)
			|| (Math.abs(this.props.currentAddress.medianAge - this.props.user.medianDesiredAge) <= 15 && this.props.user.medianAgeImportance <= 2)
			|| (Math.abs(this.props.currentAddress.medianAge - this.props.user.medianDesiredAge) <= 20 && this.props.user.medianAgeImportance === 1)
			){
				this.setState({
					ageSuccess: true
				})
			}
	}
	calculateHouseValue = () => {
		if((this.props.currentAddress.houseValue <= 2 && this.props.user.houseValueImportance <= 5)
			|| (this.props.currentAddress.houseValue <= 4 && this.props.user.houseValueImportance <= 4)
			|| (this.props.currentAddress.houseValue <= 6 && this.props.user.houseValueImportance <= 3)
			|| (this.props.currentAddress.houseValue <= 8 && this.props.user.houseValueImportance <= 2)
			|| (this.props.currentAddress.houseValue <= 10 && this.props.user.houseValueImportance === 1)
		){
			this.setState({
				houseValueSuccess: true
			})
		}
	}
	calculateDiversity = () => {
		if((this.props.currentAddress.diversity < .6 && this.props.user.diversityImportance <= 5)
			|| (this.props.currentAddress.diversity < .75 && this.props.user.diversityImportance <= 4)
			|| (this.props.currentAddress.diversity < .8 && this.props.user.diversityImportance <= 3)
			|| (this.props.currentAddress.diversity < .9 && this.props.user.diversityImportance <= 2)
			|| (this.props.currentAddress.diversity < .95 && this.props.user.diversityImportance === 1)
		){
				this.setState({
					diversitySuccess: true
				})
		}
	}
	calculateWeather = () => {
		if((this.props.user.desiredWeather === 3 && (this.props.currentNewWeather - this.props.currentOldWeather) > 5)
			|| (this.props.user.desiredWeather === 2 && (Math.abs(this.props.currentNewWeather - this.props.currentOldWeather) <= 5))
			|| (this.props.user.desiredWeather === 1 && (this.props.currentNewWeather - this.props.currentOldWeather) < -5)
		){
			this.setState({
				weatherSuccess: true
			})
		}
	}
	render() {
		let weather = '';
		if(this.props.user.desiredWeather === 3){
			weather = 'warmer'
		} else if(this.props.user.desiredWeather === 2){
			weather = 'the same'
		} else if(this.props.user.desiredWeather === 1){
			weather = 'colder'
		}
		return (
			<div>
				<ul>
					<li><span>Walkability is {this.props.currentAddress.walkScore}. Your importance was {this.props.user.walkabilityImportance}. Conclusion for you?
					{this.state.walkSuccess ? <img className='rating-hand' src='../thumbsup.png' alt='thumbs up'/> : <img className='rating-hand' src='../thumbsdown.png' alt='thumbs down'/>}</span></li>
					<li><span>Median Age is {this.props.currentAddress.medianAge} compared to your desire for {this.props.user.medianDesiredAge}. Your importance was {this.props.user.medianAgeImportance}. Conclusion for you?
					{this.state.ageSuccess ? <img className='rating-hand' src='../thumbsup.png' alt='thumbs up'/> : <img className='rating-hand' src='../thumbsdown.png' alt='thumbs down'/>}</span></li>
					<li><span>It has a diversity index of {(this.props.currentAddress.diversity * 100).toFixed(2)}% majority population. Your importance for diversity was {this.props.user.diversityImportance}. Conclusion for you?
					{this.state.diversitySuccess ? <img className='rating-hand' src='../thumbsup.png' alt='thumbs up'/> : <img className='rating-hand' src='../thumbsdown.png' alt='thumbs down'/>}</span></li>
					<li><span>Houses in the area are on average {(this.props.currentAddress.houseValue).toFixed(2)} times the average income. Your importance was {this.props.user.houseValueImportance}. Conclusion for you?
					{this.state.houseValueSuccess ? <img className='rating-hand' src='../thumbsup.png' alt='thumbs up'/> : <img className='rating-hand' src='../thumbsdown.png' alt='thumbs down'/>}</span></li>
					<li><span>You want the weather to be {weather}. Conclusion for you?
					{this.state.weatherSuccess ? <img className='rating-hand' src='../thumbsup.png' alt='thumbs up'/> : <img className='rating-hand' src='../thumbsdown.png' alt='thumbs down'/>}</span></li>
				</ul>
			</div>
		)
	}

}





export default withRouter(MoveThereScore);