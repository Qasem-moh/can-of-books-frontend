import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import Profile from './components/Profile';
import BestBooks from './BestBooks'
import Header from './Header'
import Footer from './Footer'
import Login from './Login';

class App extends Component {
  render() {
    console.log(this.props.auth0)
    return (

        <>
        <Router>
         
            <Header />
            <Switch>
              <Route exact path="/">
               
                {
                  this.props.auth0.isAuthenticated? 
                  <BestBooks/>:
                  <Login/>
                }
              </Route>
              
              <Route path="/profile">
                {this.props.auth0.isAuthenticated && <Profile/> }
                </Route>

                <Route path='/login'>
                <Login/>
                </Route>
                
            </Switch>
            <Footer />
         
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
