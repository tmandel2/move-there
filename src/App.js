import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import AuthContainer from './AuthContainer';
import UserContainer from './UserContainer';

const My404 = () => {
  return (
    <div>
      <img src="404Cat.jpg" alt="404 Cat"/>
    </div>
  )
}
class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      username: '',
      _id: ''
    }
  }
  logIn = (user) => {
    console.log('LOGIN HIT');
    this.setState({
      loggedIn: true,
      username: user.username,
      _id: user.id
    });
  }
  render() {
    return(
      <main>
        <Switch>
          <Route exact path="/" render= {props => <AuthContainer username={this.state.username} _id={this.state._id} logIn={this.logIn} />} />
          <Route exact path="/users" component={ UserContainer }/>
          <Route component={ My404 }/>
        </Switch>
      </main>
    );
  }
}

export default App;