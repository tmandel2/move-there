import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import AuthContainer from './AuthContainer';
import UserContainer from './UserContainer';
import AddressContainer from './AddressContainer';

const My404 = () => {
  return (
    <div>
      <img src="../404Cat.jpg" alt="404 Cat"/>
    </div>
  )
}
class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      username: '',
      _id: '',
      currentAddress: {}
    }
  }
  logIn = (user) => {
    console.log('LOGIN HIT');
    this.setState({
      loggedIn: true,
      username: user.username,
      _id: user.id
    });
    console.log(this.state);
    this.props.history.push('/users');
  }
  showAddress = async (identity, e) => {
    e.preventDefault();
      try {
        const response = await fetch(`${process.env.REACT_APP_ROUTE}addresses/${identity}`, {
          credentials: 'include'
        });
        if(!response.ok){
          throw Error(response.statusText);
        }
        const addressParsed = await response.json();
        console.log(addressParsed);
        this.setState({
          currentAddress: addressParsed
        })
        this.props.history.push(`/addresses`);
    } catch(err) {
        console.log(err);
        return err;
    }
  }
  render() {
    return(
      <main>
        <Switch>
          <Route exact path="/" render= {props => <AuthContainer username={this.state.username} _id={this.state._id} logIn={this.logIn} history={this.props.history} />} />
          <Route exact path="/users" render={props => <UserContainer username={this.state.username} _id={this.state._id} history={this.props.history} showAddress={this.showAddress} />} />
          <Route exact path="/addresses" render={props => <AddressContainer username={this.state.username} _id={this.state._id} history={this.props.history} currentAddress={this.state.currentAddress}/>} />
          <Route component={ My404 }/>
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);