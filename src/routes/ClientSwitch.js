import React, { Component } from "react";
import { ClientMain } from "../pages/Client/ClientMain";
import ClientContract from "../pages/Client/ClientContract";
import ClientDeal from "../pages/Client/ClientDeal";
import ClientReport from "../pages/Client/ClientReport";
import ClientDriver from "../pages/Client/Client-Driver";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

export default class ClientSwitch extends Component {
  render() {
    return (
      <Router basename="/client">
        <Switch>
          <Route path="/" exact>
            <ClientMain />
          </Route>
          <Route path="/contract" exact>
            <ClientContract />
          </Route>
          <Route path="/bill" exact>
            <ClientDeal />
          </Route>
          <Route path="/report" exact>
            <ClientReport />
          </Route>
          <Route path="/driver" exact>
            <ClientDriver />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
