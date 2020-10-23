import React, { Component } from 'react'

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
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
          <Route exact path="/search" component={SearchPage} />
          <Route path="/products" exact>
            <StationProduct />
          </Route>
         
        </Switch>
      </Router>
      );
    }
  }

  const SearchPage = ({ location }) => {
    return (
      <p>
        <strong>Location Props: </strong>
        {JSON.stringify(location, null, 2)}
      </p>
    );
  }