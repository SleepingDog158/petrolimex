import React, { Component } from 'react'
import Station from '../pages/Station';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import StationBill from '../pages/Station/StationBill'
import StationMain from '../pages/Station/StationMain'
import StationProduct from '../pages/Station/StationProductList'
export default class StationSwitch extends Component {
    render() {
      return (
        <Router basename='/station'>
        <Switch>
          <Route path="/" exact>
            <StationMain />
          </Route>
          <Route path="/bills" exact>
            <StationBill />
          </Route>
          
          <Route path="/products" exact>
            <StationProduct />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
      );
    }
  }