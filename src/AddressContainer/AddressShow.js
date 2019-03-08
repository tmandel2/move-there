import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class AddressShow extends Component {
	constructor() {
		super();
		this.state = {
			youTubeURL: 'https://www.youtube.com/embed/98H5AN_vfOY',
			wiki: {}
		}
	}
	componentDidMount() {
		this.getLoaded();
	}
	getLoaded = async () => {
		try{
			console.log("LOADING");
			const youtubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&q=${this.props.currentAddress.city}+${this.props.currentAddress.state}+tour&safeSearch=moderate&order=relevance&key=${process.env.REACT_APP_GOOGLEKEY}`);
			
			const parsedYoutube = await youtubeResponse.json();

			const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${this.props.currentAddress.city}%2C_${this.props.currentAddress.state}?redirect=true`);
				const parsedWiki = await wikiResponse.json();
				console.log(parsedWiki, 'Parsed Wiki');

			// if(this.props.currentAddress.id){
			this.setState({
				youTubeURL: `https://www.youtube.com/embed/${parsedYoutube.items[0].id.videoId}`,
				wiki: parsedWiki
			})
			// }
		} catch(err) {
			console.log(err);
		}
	}
	render() {
		console.log('rendering');
		console.log(this.state.youTubeURL);
		console.log(this.props.currentAddress);
		console.log(this.state.wiki);
		return (
			<div>
				{this.props.currentAddress.id} {this.props.currentAddress.walkScore}{this.props.currentAddress.streetNumber} {this.props.currentAddress.streetName}, {this.props.currentAddress.city}, {this.props.currentAddress.state} {this.props.currentAddress.zipCode}<br/>
				<iframe title='tour video' width="300" height="200" src={this.state.youTubeURL}></iframe>
				{this.state.wiki.extract}
			</div>
		)
	}
}





export default withRouter(AddressShow);