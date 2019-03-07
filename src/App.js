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

    }
  }
  render() {
    return(
      <main>
        <Switch>
          <Route exact path="/" component={ AuthContainer }/>
          <Route exact path="/users" component={ UserContainer }/>
          <Route component={ My404 }/>
        </Switch>
      </main>
    );
  }
}

export default App;