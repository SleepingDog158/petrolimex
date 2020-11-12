import React, { Component } from "react";
import NavBarStation from "../../components/NavBarStation"

import {BillsList} from "../../components/BillsList"
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
            <BillsList /></div>
        </div>
      </div>
    );
  }
}
