import React, { Component } from "react";
import NavBarStation from "../../components/NavBarStation"

import {BillsListStation} from "../../components/BillsListStation"
import "../../components/Client.css"
export default class StationMain extends Component {
  
  render() {
    return (
      <div>
        <NavBarStation/>
        <div style={{marginLeft:"5%"}} >
          <div className="tag-name" >
            <h4 style={{marginTop:"70px"}}>Lịch sử giao dịch</h4>
          </div>
          <div style={{alignSelf:"center"}}>
            <BillsListStation /></div>
        </div>
      </div>
    );
  }
}
