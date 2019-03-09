import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoveThereScore from './MoveThereScore.js';


class AddressShow extends Component {
	constructor() {
		super();
		this.state = {
			youTubeURL: 'https://www.youtube.com/embed/98H5AN_vfOY',
			wiki: {},
			currentNewWeather: 0,
			currentOldWeather: 0,
			loading: true
		}
	}
	componentDidMount() {
		Promise.all([this.getYouTube(),this.getOldWeather(),this.getWiki(),this.getNewWeather()]).then(
			this.setState({
				loading: false
			}));
		// this.getNewWeather();
	}
	getYouTube = async () => {
		try{
			const youtubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&videoEmbeddable=true&maxResults=1&q=${this.props.currentAddress.city}+${this.props.currentAddress.state}+tour&safeSearch=moderate&order=relevance&key=${process.env.REACT_APP_GOOGLEKEY}`);
			
			const parsedYoutube = await youtubeResponse.json();

			this.setState({
				youTubeURL: `https://www.youtube.com/embed/${parsedYoutube.items[0].id.videoId}`
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
				wiki: parsedWiki
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
					currentOldWeather: Math.round((parsedOldWeather.main.temp - 273.15) * 9 / 5 + 32)
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
				currentNewWeather: Math.round((parsedNewWeather.main.temp - 273.15) * 9 / 5 + 32)
			})

			// const currentTemp = Math.round((parsedOldWeather.main.temp - 273.15) * 9 / 5 + 32);
		} catch(err) {
			console.log(err);
		}
	}
	render() {

		return (
			<div className='Address-Show'>
				{this.state.loading ? 
					<h1>LOADING</h1>
					: 
					<div className='Address-Info'>
						{this.props.loggedIn ? 
						<MoveThereScore />
						: null}
						ID: {this.props.currentAddress.id} WALKSCORE: {this.props.currentAddress.walkScore}<br/>{this.props.currentAddress.streetNumber} {this.props.currentAddress.streetName}, {this.props.currentAddress.city}, {this.props.currentAddress.state} {this.props.currentAddress.zipCode}<br/>
						<iframe title='tour video' src={this.state.youTubeURL} className='iframe'></iframe>
						<p>{this.state.wiki.extract}</p>
						<h4>Courtesy WikiMedia</h4>

						{this.props.loggedIn ? <h2>It is currently {this.state.currentOldWeather}&deg; F at your current residence</h2> : null}
						<h2>It is currently {this.state.currentNewWeather}&deg; F at your perspective place</h2>
					</div>
				}
			</div>
		)
	}
}





export default withRouter(AddressShow);