import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { AuthContext } from "../contexts/Auth";
import ClientSwitch from "./ClientSwitch";
import LandingPage from "../pages/LandingPage";
import Client from "../pages/Client";
import Admin from "../pages/Admin";
import Station from "../pages/Station";
import AdminSwitch from "./AdminSwitch";

import { STATION, ADMIN, CLIENT } from "../constants";

class AuthSwitch extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <LandingPage />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}


class Bill extends Component {
  render() {
    return <div>bill</div>;
  }
}

class StationSwitch extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/station" exact>
            <Station />
          </Route>
          <Route path="/station/bill" exact>
            <Bill />
          </Route>
          <Redirect to="/station" />
        </Switch>
      </Router>
    );
  }
}

export default class Routers extends Component {
  render() {
    let auth = this.context;
    console.log(auth.role);
    if (!auth.isLogin) {
      return <AuthSwitch />;
    }

    // check role
    switch (auth.role) {
      case ADMIN:
        return <AdminSwitch />;
      case CLIENT:
        return <ClientSwitch />;
      case STATION:
        return <StationSwitch />;
      case null:
        return null;
    }

    // return (
    //   <Router>
    //     <Switch>
    //       <Route path="/admin" exact>
    //         <AdminSwitch />
    //       </Route>
    //       <Route path="/client" exact>
    //         <ClientSwitch />
    //       </Route>
    //       <Route path="/station" exact>
    //         <StationSwitch />
    //       </Route>
    //     </Switch>
    //   </Router>
    // )
  }
}

Routers.contextType = AuthContext;
