import React, { Component } from 'react'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'

export default class AdminSwitch extends Component {
    render() {
      return (
        <Router>
          <Switch>
            <Route path="/admin" exact>
              <Admin />
            </Route>
          </Switch>
          <Redirect to="/admin" />
        </Router>
      );
    }
  }