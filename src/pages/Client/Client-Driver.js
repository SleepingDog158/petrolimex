import React, { Component } from "react";

import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import {DriversList} from "../../components/DriversList"
import "../../components/Client.css"
export default class ClientDriver extends Component {
  
  render() {
    return (
      <div>
        <PageHeader />
        <Sidebar />
        <div className="content-area">
          <div className="tag-name">
            <h3>Danh sách tài xế</h3>
          </div>
            <DriversList/>
        </div>
      </div>
    );
  }
}
