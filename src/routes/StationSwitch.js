import React, { Component } from 'react'
import Station from '../pages/Station';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'

export default class StationSwitch extends Component {
    render() {
      return (
        <Router>
          <Switch>
            <Route path="/station" exact>
              <Station />
            </Route>
          </Switch>
          <Redirect to="/station" />
        </Router>
      );
    }
  }