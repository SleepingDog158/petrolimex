import React, { Component } from "react";
import NavBarStation from "../../components/NavBarStation"

import {BillsListStation} from "../../components/BillsListStation"
import "../../components/Client.css"
export default class StationMain extends Component {
  
  render() {
    return (
      <div>
        <NavBarStation/>
        <div className="container" >
          <div className="tag-name" >
            <h4 style={{"margin-top":"70px"}}>Lịch sử giao dịch</h4>
          </div>
            <BillsListStation/>
        </div>
      </div>
    );
  }
}
