import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import AuthContainer from './AuthContainer';

const My404 = () => {
  return (
    <div>
      You've Taken a Wrong Turn
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
          <Route component={ My404 }/>
        </Switch>
      </main>
    );
  }
}

export default App;