import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import Content from './components/Content';
import Home from './components/Home';
import Profile from './components/Profile';
import LogoutButton from './components/LogoutButton';
import BestBooks from './BestBooks'
import BrowserRouter from './components/BrowserRouter'

class App extends Component {
  render() {
    console.log(this.props.auth0)
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            
            {
              this.props.auth0.isAuthenticated ?
                <>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/bestbooks">BestBooks</Link>
                  </li>
                  
                  <li>
                  <Link to="/BrowserRouter">BrowserRouter</Link>
                  </li>
                 
                </> :
                <li>
                  <Link to="/login">Login</Link>
                </li>
            }
          </ul>
        </nav>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <LoginButton />
          </Route>
          <Route path='/logout'>
            <LogoutButton />
          </Route>
          <Route path='/profile'>
            <Profile />
            <Content />
          </Route>
          <Route path='/bestbooks'>
            <BestBooks />
          </Route>
          <Route path='/BrowserRouter'>
            <BrowserRouter />
            

           
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default withAuth0(App);