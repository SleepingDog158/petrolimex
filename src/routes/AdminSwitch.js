import React, { Component } from 'react'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import { AdminMain } from "../pages/Admin/AdminMain"
import AdminPartner from "../pages/Admin/AdminPartner"
import { AdminPartnerMain } from "../pages/Admin/AdminPartnerMain"
import AdminProduct from "../pages/Admin/AdminProduct"
import AdminStation from "../pages/Admin/AdminStation"
import AdminContract from '../pages/Admin/AdminContract'
import AdminBill from '../pages/Admin/AdminBill'
import AdminPartnerContract from '../pages/Admin/AdminPartnerContract'
import AdminPartnerDriver from '../pages/Admin/AdminPartnerDriver'
import AdminPartnerBill from '../pages/Admin/AdminPartnerBill'

export default class AdminSwitch extends Component {
  render() {
    return (
      <Router basename="/">
        <Switch>
          <Route path="/admin" exact>
            <AdminMain />
          </Route>
          <Route path="/admin/partner" exact>
            <AdminPartner />
          </Route>
          <Route path="/admin/product" exact>
            <AdminProduct />
          </Route>
          <Route path="/admin/station" exact>
            <AdminStation />
          </Route>
          <Route path="/admin/contract" exact>
            <AdminContract />
          </Route>
          <Route path="/admin/bill" exact>
            <AdminBill />
          </Route>
          <Route path="/admin/partner/:clientId" exact>
            <AdminPartnerMain />
          </Route>
          <Route path="/admin/partner/:clientId/contract" exact>
            <AdminPartnerContract />
          </Route>
          <Route path="/admin/partner/:clientId/driver" exact>
            <AdminPartnerDriver />
          </Route>
          <Route path="/admin/partner/:clientId/bill" exact>
            <AdminPartnerBill />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
