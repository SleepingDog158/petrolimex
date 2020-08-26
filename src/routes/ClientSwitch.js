import React, { Component } from 'react'
import Client from '../pages/Client/Client';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'

export default class ClientSwitch extends Component {
    render() {
      return (
        <Router>
          <Switch>
            <Route path="/client" exact>
              <Client />
            </Route>
          </Switch>
          <Redirect to="/client" />
        </Router>
      );
    }
  }