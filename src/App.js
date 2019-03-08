import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import AuthContainer from './AuthContainer';
import UserContainer from './UserContainer';
import AddressContainer from './AddressContainer';
import Header from './Header';

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
      user: {},
      currentAddress: {}
    }
  }
  logIn = (user) => {
    console.log('LOGIN HIT');
    this.setState({
      loggedIn: true,
      user: user
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
        this.setState({
          currentAddress: addressParsed
        })
        this.props.history.push(`/addresses`);
    } catch(err) {
        console.log(err);
    }
  }
  showIndex = () => {
    console.log('Show index clicked');
    this.setState({
      currentAddress: {}
    })
  }
  render() {
    return(
      <main>
        <Header showAddress={this.showAddress} history={this.props.history} loggedIn={this.state.loggedIn}  showIndex={this.showIndex} />
        <Switch>
          <Route exact path="/" render= {props => <AuthContainer username={this.state.user.username} _id={this.state.user.id} logIn={this.logIn} history={this.props.history} loggedIn={this.state.loggedIn} />} />
          <Route exact path="/users" render={props => <UserContainer username={this.state.user.username} _id={this.state.user.id} history={this.props.history} showAddress={this.showAddress} loggedIn={this.state.loggedIn} showIndex={this.showIndex} />} />
          <Route exact path="/addresses" render={props => <AddressContainer username={this.state.user.username} _id={this.state.user.id} user={this.state.user} history={this.props.history} currentAddress={this.state.currentAddress} loggedIn={this.state.loggedIn} showAddress={this.showAddress} showIndex={this.showIndex} />} />
          <Route component={ My404 }/>
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);