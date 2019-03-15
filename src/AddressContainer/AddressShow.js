import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoveThereScore from './MoveThereScore.js';


class AddressShow extends Component {
	constructor() {
		super();
		this.state = {
			youTubeURL: 'https://www.youtube.com/embed/98H5AN_vfOY',
			wiki: {},
			yelps: [],
			currentNewWeather: 0,
			currentOldWeather: 0,
			loading: 0
		}
	}
	componentDidMount() {
		this.getYouTube();
		this.getOldWeather();
		this.getWiki();
		this.getNewWeather();
		this.getYelp();
	}
	getYouTube = async () => {
		try{
			const youtubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&videoEmbeddable=true&maxResults=1&q=${this.props.currentAddress.city}+${this.props.currentAddress.state}+fun&safeSearch=moderate&order=relevance&key=${process.env.REACT_APP_GOOGLEKEY}`);
			
			const parsedYoutube = await youtubeResponse.json();

			this.setState({
				youTubeURL: `https://www.youtube.com/embed/${parsedYoutube.items[0].id.videoId}`,
				loading: this.state.loading + 1
			})
			// }
		} catch(err) {
			console.log(err);
		}
	}
	getWiki = async () => {
		try {
			const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${this.props.currentAddress.city}%2C_${this.props.currentAddress.state}?redirect=true`);

			const parsedWiki = await wikiResponse.json();

			this.setState({
				wiki: parsedWiki,
				loading: this.state.loading + 1
			})
		} catch(err) {
			console.log(err);
		}
	}
	getOldWeather = async () => {
		if(this.props.user.id){
			try{
				const oldWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.props.user.currentZip},us&appid=${process.env.REACT_APP_OWMAPPID}`)

				const parsedOldWeather = await oldWeatherResponse.json();

				this.setState({
					currentOldWeather: Math.round((parsedOldWeather.main.temp - 273.15) * 9 / 5 + 32),
					loading: this.state.loading + 1
				})

				// const currentTemp = Math.round((parsedOldWeather.main.temp - 273.15) * 9 / 5 + 32);
			} catch(err) {
				console.log(err);
			}
		}
	}
	getNewWeather = async () => {
		try{
			const newWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.props.currentAddress.zipCode},us&appid=${process.env.REACT_APP_OWMAPPID}`)

			const parsedNewWeather = await newWeatherResponse.json();

			this.setState({
				currentNewWeather: Math.round((parsedNewWeather.main.temp - 273.15) * 9 / 5 + 32),
				loading: this.state.loading + 1
			})

			// const currentTemp = Math.round((parsedOldWeather.main.temp - 273.15) * 9 / 5 + 32);
		} catch(err) {
			console.log(err);
		}
	}
	getYelp = async () => {
		if(this.props.user.nearbyAmenities){
			try{
				const yelpResponse = await fetch(`${process.env.REACT_APP_ROUTE}addresses/yelp`, {
					credentials: 'include',
					headers: {
						url: `https://api.yelp.com/v3/businesses/search?latitude=${this.props.currentAddress.latitude}&longitude=${this.props.currentAddress.longitude}&radius=16000&term=${this.props.user.nearbyAmenities}&sort_by=distance`,
						key: `${process.env.REACT_APP_YELPKEY}`
					}
				})
				const parsedYelp = await yelpResponse.json();
				this.setState({
					yelps: parsedYelp.businesses,
					loading: this.state.loading + 1
				})
			} catch(err) {
				console.log(err);
			}
		}
	}
	render() {
		const streetDeSpaced = this.props.currentAddress.streetName.replace(' ', '-');
		const cityDeSpaced = this.props.currentAddress.city.replace(' ', '-');
		const stateDeSpaced = this.props.currentAddress.state.replace(' ', '-');
		const walkScoreSrcWalk = `//pp.walk.sc/badge/walk/${this.props.currentAddress.streetNumber}-${streetDeSpaced}-${cityDeSpaced}-${stateDeSpaced}-${this.props.currentAddress.zipCode}.svg`;
		const walkScoreSrcTrans = `//pp.walk.sc/badge/transit/${this.props.currentAddress.streetNumber}-${streetDeSpaced}-${cityDeSpaced}-${stateDeSpaced}-${this.props.currentAddress.zipCode}.svg`;
		const walkScoreSrcBike = `//pp.walk.sc/badge/bike/${this.props.currentAddress.streetNumber}-${streetDeSpaced}-${cityDeSpaced}-${stateDeSpaced}-${this.props.currentAddress.zipCode}.svg`;
		const WalkScoreLink = `https://www.walkscore.com/score/${this.props.currentAddress.streetNumber}-${streetDeSpaced}-${cityDeSpaced}-${stateDeSpaced}-${this.props.currentAddress.zipCode}.svg?utm_source=badge&utm_medium=responsive&utm_campaign=badge`;
		const yelpDistanceList = this.state.yelps.map((yelp, i) => {
			if(yelp) {
				return (
					<li key={i}>
						<a href={yelp.url} target='_blank' rel='noopener noreferrer'>{yelp.name}</a> is {Number((yelp.distance / 1609.344).toFixed(1))} miles away
					</li>
				)
			} else {
				return null
			}
		})
		return (
			<div className='Address-Show'>
				{this.props.loggedIn ?
					<div>
					{this.state.loading < 5 ? 
						<h1>LOADING</h1>
						: 
						<div className='Address-Info'>

							<h2>{this.props.currentAddress.streetNumber} {this.props.currentAddress.streetName}, {this.props.currentAddress.city}, {this.props.currentAddress.state} {this.props.currentAddress.zipCode}</h2>
							{this.props.currentAddress.user.id === this.props.user.id ?
								<button onClick={this.props.showEdit}>Edit This Address</button>
								: null}
							{this.props.loggedIn ? 
							<MoveThereScore user={this.props.user} currentAddress={this.props.currentAddress} currentNewWeather= {this.state.currentNewWeather} currentOldWeather = {this.state.currentOldWeather} />
							: null}
							<div className='weathers'>
								{this.props.loggedIn ? <h2>It is {this.state.currentOldWeather}&deg; F where you are.</h2> : null}
								<h2>It is {this.state.currentNewWeather}&deg; F here.</h2>
							</div>
							<div>
								<a href={WalkScoreLink} target='_blank' rel='noopener noreferrer nofollow'>
									<img src={walkScoreSrcWalk} alt="Walk Score of Current Address"/>
									<img src={walkScoreSrcTrans} alt="Transit Score of Current Address"/>
									<img src={walkScoreSrcBike} alt="Bike Score of Current Address"/>
								</a>
							</div>
							<p>{this.state.wiki.extract}</p>
							<h4>Courtesy WikiMedia</h4>
							<iframe title='tour video' src={this.state.youTubeURL} className='iframe'></iframe>
							{this.props.user.nearbyAmenities ?
								<h2>These Places Are Related To Your Desire For {this.props.user.nearbyAmenities}</h2>
								: null
							}
							<ul className='yelp-list'>
								{yelpDistanceList}
							</ul>
						</div>
					} </div>
					: <div>{this.state.loading < 3 ?
						<h1>LOADING</h1>
						: 
						<div className='Address-Info'>

							<h2>{this.props.currentAddress.streetNumber} {this.props.currentAddress.streetName}, {this.props.currentAddress.city}, {this.props.currentAddress.state} {this.props.currentAddress.zipCode}</h2>
							{this.props.currentAddress.user.id === this.props.user.id ?
								<button onClick={this.props.showEdit}>Edit This Address</button>
								: null}
							{this.props.loggedIn ? 
							<MoveThereScore user={this.props.user} currentAddress={this.props.currentAddress} currentNewWeather= {this.state.currentNewWeather} currentOldWeather = {this.state.currentOldWeather} />
							: null}
							<div className='weathers'>
								{this.props.loggedIn ? <h2>It is {this.state.currentOldWeather}&deg; F where you are.</h2> : null}
								<h2>It is {this.state.currentNewWeather}&deg; F here.</h2>
							</div>
							<div>
								<a href={WalkScoreLink} target='_blank' rel='noopener noreferrer nofollow'>
									<img src={walkScoreSrcWalk} alt="Walk Score of Current Address"/>
									<img src={walkScoreSrcTrans} alt="Transit Score of Current Address"/>
									<img src={walkScoreSrcBike} alt="Bike Score of Current Address"/>
								</a>
							</div>
							<p>{this.state.wiki.extract}</p>
							<h4>Courtesy WikiMedia</h4>
							<iframe title='tour video' src={this.state.youTubeURL} className='iframe'></iframe>
							{this.props.user.nearbyAmenities ?
								<h2>These Places Are Related To Your Desire For {this.props.user.nearbyAmenities}</h2>
								: null
							}
							<ul className='yelp-list'>
								{yelpDistanceList}
							</ul>
						</div>
					}</div>
				}
			</div>
		)
	}
}





export default withRouter(AddressShow);