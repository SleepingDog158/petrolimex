import React, { Component } from "react";
import NavBarStation from "../../components/NavBarStation";
import { Table, Button } from "react-bootstrap";
import "../../components/Client.css";
import {BillCreate} from "../../components/BillCreate"
export default class StationBill extends Component {
  render() {
    return (
      <div>
        <NavBarStation />
        <div className="container d-flex flex-row">
          <div
            className="user-side col-6 mr-1"
            style={{
              marginTop:"30px",
              height: "95vh",
              borderStyle: "outset"
            }}
          >
            <BillCreate/>
          </div>
          <div
            className="bill-side col-6 ml-1 d-flex flex-column align-items-center"
            style={{ marginTop: "3.5%", borderStyle: "outset" }}
          >
            <h3 className="mt-5">Tạo hóa đơn</h3>
            <Table>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Loại nhiên liệu
                </th>
                <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                  <input className="col-11" defaultValue={""} />
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Số lượng (lit)
                </th>
                <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                  <input className="col-11" defaultValue={""} />
                </td>
              </tr>

              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Thành tiền
                </th>
                <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                  <input className="col-11" defaultValue={""} />
                </td>
              </tr>
              
            </Table>
            <div><Button variant="success" className="mr-5" size="lg">Xác nhận</Button>
               
               <Button variant="danger" className="ml-5" size="lg">Cancel</Button></div>
             
          </div>
        </div>
      </div>
    );
  }
}
