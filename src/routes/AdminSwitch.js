import React, { Component } from 'react'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import AdminMain from "../pages/Admin/AdminMain"
import AdminPartner from "../pages/Admin/AdminPartner"
import AdminPartnerMain from "../pages/Admin/AdminPartnerMain"
import AdminProduct from "../pages/Admin/AdminProduct"
import AdminStation from "../pages/Admin/AdminStation"
import AdminContract from '../pages/Admin/AdminContract'
import AdminBill from '../pages/Admin/AdminBill'
import AdminPartnerContract from '../pages/Admin/AdminPartnerContract'
import AdminPartnerDriver from '../pages/Admin/AdminPartnerDriver'

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
            <Route path="/station" exact>
              <AdminStation/>
            </Route>
            <Route path="/contract" exact>
              <AdminContract/>
            </Route>
            <Route path="/bill" exact>
              <AdminBill/>
            </Route>
            <Route path="/partner-main"exact>
              <AdminPartnerMain/>
            </Route>
            <Route path="/partner-contract" exact>
              <AdminPartnerContract/>
            </Route>
            <Route path="/partner-driver" exact>
              <AdminPartnerDriver/>
            </Route>
            <Redirect to="/"/>
          </Switch>
        </Router>
      );
    }
  }