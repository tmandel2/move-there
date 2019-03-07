import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

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
        <div>APP</div>
       {/* <Switch>
          <Route exact path="/" component={ AuthContainer }/>
          <Route exact path="/users" component={ UserContainer }/>
          <Route exact path="/addresses" component={ AddressContainer }/>
          <Route component={ My404 }/>
        </Switch>*/}
      </main>
    );
  }
}

export default App;