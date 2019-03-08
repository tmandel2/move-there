import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class AddressShow extends Component {
	constructor() {
		super();
		this.state = {
			youTubeURL: 'https://www.youtube.com/embed/98H5AN_vfOY',
			wiki: {},
			currentNewWeather: {},
			currentOldWeather: 0,
			loading: true
		}
	}
	componentDidMount() {
		Promise.all([this.getYouTube(),this.getOldWeather(),this.getWiki()]).then(
			this.setState({
				loading: false
			}));
		// this.getNewWeather();
	}
	getYouTube = async () => {
		try{
			const youtubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&q=${this.props.currentAddress.city}+${this.props.currentAddress.state}+tour&safeSearch=moderate&order=relevance&key=${process.env.REACT_APP_GOOGLEKEY}`);
			
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
	render() {

		return (
			<div>
				{this.state.loading ? 
					<h1>LOADING</h1>
					: <div>
						ID: {this.props.currentAddress.id} WALKSCORE: {this.props.currentAddress.walkScore}<br/>{this.props.currentAddress.streetNumber} {this.props.currentAddress.streetName}, {this.props.currentAddress.city}, {this.props.currentAddress.state} {this.props.currentAddress.zipCode}<br/>
						<iframe title='tour video' width="300" height="200" src={this.state.youTubeURL}></iframe>
						<p>{this.state.wiki.extract}</p>

						<h2>It is currently {this.state.currentOldWeather} at your current residence</h2>
					</div>
				}
			</div>
		)
	}
}





export default withRouter(AddressShow);