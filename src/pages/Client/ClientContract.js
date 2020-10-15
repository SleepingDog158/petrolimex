import React, { Component } from "react";

import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import {ContractList} from "../../components/ContractList"
import "../../components/Client.css"
export default class ClientDriver extends Component {
  
  render() {
    return (
      <div>
        <PageHeader />
        <Sidebar />
        <div className="content-area">
          <div className="tag-name">
            <h4>Danh sách hợp đồng</h4>
          </div>
            <ContractList/>
        </div>
      </div>
    );
  }
}
