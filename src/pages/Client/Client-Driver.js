import React, { Component } from "react";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {DriversList} from "../../components/DriversList"
import "../../components/Client.css"
export default class ClientDriver extends Component {
  
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <div className="content-area">
          <div className="tag-name">
            <h4>Danh sách tài xế</h4>
          </div>
            <DriversList/>
        </div>
      </div>
    );
  }
}
