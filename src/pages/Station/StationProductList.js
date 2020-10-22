import React, { Component } from "react";
import NavBarStation from "../../components/NavBarStation"
import GasPriceTable from "../../components/GasPriceTable"
import "../../components/Client.css"
export default class StationMain extends Component {
  
  render() {
    return (
      <div>
        <NavBarStation/>
        <div className="container" >
          <div className="tag-name" >
            <h4 style={{marginTop:"70px"}}>Lịch sử giao dịch</h4>
          </div>
            <GasPriceTable/>
        </div>
      </div>
    );
  }
}
