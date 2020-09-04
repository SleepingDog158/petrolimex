import React, { Component } from "react";

import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import {DriversCreditList} from "../../components/DriversCreditList"
import "../../components/Client.css"
export default class ClientDriver extends Component {
  
  render() {
    return (
      <div>
        <PageHeader />
        <Sidebar />
        <div className="content-area">
          <div className="tag-name">
            <h3>Báo cáo công nợ tài xế</h3>
          </div>
            <DriversCreditList/>
        </div>
      </div>
    );
  }
}
