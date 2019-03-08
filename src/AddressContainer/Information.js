import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Information extends Component {
	constructor(){
		super();
		this.state = {

		}
	}
	componentDidMount(){
		this.render();
	}
	render(){
		return (
			<div>
				<iframe title='tour video' width="300" height="200" src={this.props.youTubeURL}></iframe>
				<p>{this.props.wiki}</p>
			</div>
		)
	}
}



export default withRouter(Information);

