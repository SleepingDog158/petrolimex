import React, { Component } from 'react'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import AdminMain from "../pages/Admin/AdminMain"
import AdminPartner from "../pages/Admin/AdminPartner"
import AdminPartnerMain from "../pages/Admin/AdminPartnerMain"
import AdminProduct from "../pages/Admin/AdminProduct"
import AdminStat from "../pages/Admin/AdminStat"
import AdminStation from "../pages/Admin/AdminStation"

export default class AdminSwitch extends Component {
    render() {
      return (
        <Router basename="/admin">
          <Switch>
            <Route path="/" exact>
              <AdminMain/>
            </Route>
            <Route path="/partner" exact>
              <AdminPartner/>
            </Route>
            <Route path="/product" exact>
              <AdminProduct/>
            </Route>
            <Route path ="/stat" exact>
              <AdminStat/>
            </Route>
            <Route path="/station" exact>
              <AdminStation/>
            </Route>
            <Redirect to="/"/>
          </Switch>
        </Router>
      );
    }
  }