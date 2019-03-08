import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class AddressShow extends Component {
	constructor() {
		super();
		this.state = {
			youTubeURL: ''
		}
	}
	componentDidMount() {
		this.getYouTube();
	}
	getYouTube = async () => {
		try{
			const youtubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&q=${this.props.currentAddress.city}+${this.props.currentAddress.state}+tour&safeSearch=moderate&order=relevance&key=${process.env.REACT_APP_GOOGLEKEY}`);

			const parsedYoutube = await youtubeResponse.json();

			this.setState({
				youTubeURL: `https://www.youtube.com/embed/${parsedYoutube.items[0].id.videoId}`
			})

		} catch(err) {
			console.log(err);
		}
	}
	render() {
		return (
			<div>
				Address AdressShow
				{this.props.currentAddress.id} {this.props.currentAddress.walkScore}{this.props.currentAddress.streetNumber} {this.props.currentAddress.streetName}, {this.props.currentAddress.city}, {this.props.currentAddress.state} {this.props.currentAddress.zipCode}
				<iframe width="300" height="200" src={this.state.youTubeURL}></iframe>
			</div>
		)
	}
}





export default withRouter(AddressShow);