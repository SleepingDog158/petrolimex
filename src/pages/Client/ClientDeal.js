import React, { Component } from "react";

import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import {BillsList} from "../../components/BillsList"
import "../../components/Client.css"
export default class ClientDeal extends Component {
  
  render() {
    return (
      <div>
        <PageHeader />
        <Sidebar />
        <div className="content-area">
          <div className="tag-name">
            <h4>Lịch sử giao dịch</h4>
          </div>
            <BillsList/>
        </div>
      </div>
    );
  }
}
