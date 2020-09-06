import React, { Component } from 'react'
import ClientMain from '../pages/Client/Client-Main'
import ClientContract from '../pages/Client/ClientContract'
import ClientDeal from '../pages/Client/ClientDeal'
import ClientReport from '../pages/Client/ClientReport'
import ClientDriver from '../pages/Client/Client-Driver'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'

export default class ClientSwitch extends Component {
    render() {
      return (
        <Router>
          <Switch>
            <Route path="/client" exact>
              <ClientMain />
            </Route>
            <Route path="/client/contract" exact>
              <ClientContract />
            </Route>
            <Route path="/client/bill" exact>
              <ClientDeal />
            </Route>
            <Route path="/client/report" exact>
              <ClientReport />
            </Route>
            <Route path="/client/driver" exact>
              <ClientDriver />
            </Route>
          </Switch>
          <Redirect to="/client" />
        </Router>
      );
    }
  }